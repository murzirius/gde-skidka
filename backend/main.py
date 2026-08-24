from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy.orm import sessionmaker
import models
import os
from pydantic import BaseModel
from typing import List, Optional

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://gde_skidka:secure_password@localhost/gde_skidka")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Создание таблиц при запуске (в проде лучше использовать Alembic)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Где Скидка API")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/discounts")
def get_discounts(lat: float, lon: float, radius: int = 5000, category: Optional[str] = None, db: Session = Depends(get_db)):
    """
    Получение списка скидок рядом с пользователем.
    """
    query = db.query(models.Discount).join(models.Store).filter(models.Discount.active == True)
    
    if category:
        query = query.filter(models.Discount.category == category)
        
    # Пример гео-фильтрации через PostGIS:
    # point = func.ST_SetSRID(func.ST_MakePoint(lon, lat), 4326)
    # query = query.filter(func.ST_DWithin(models.Store.location, point, radius))
    
    # Сортировка по размеру скидки
    query = query.order_by(models.Discount.discount_percentage.desc().nulls_last())
    
    return query.limit(50).all()

@app.post("/api/discounts")
def add_discount(
    store_id: int = Form(...),
    title: str = Form(...),
    category: str = Form(...),
    old_price: float = Form(None),
    new_price: float = Form(...),
    needs_loyalty_card: bool = Form(False),
    min_items_required: int = Form(None),
    captcha_token: str = Form(...),
    photo: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Добавление новой скидки.
    """
    # Здесь должна быть проверка captcha_token через Yandex SmartCaptcha API
    
    # Расчет процента скидки
    discount_percentage = None
    if old_price and old_price > new_price:
        discount_percentage = round((old_price - new_price) / old_price * 100, 2)
        
    new_discount = models.Discount(
        store_id=store_id,
        title=title,
        category=category,
        old_price=old_price,
        new_price=new_price,
        discount_percentage=discount_percentage,
        needs_loyalty_card=needs_loyalty_card,
        min_items_required=min_items_required,
        photo_url="https://s3.yandex.net/bucket/example.jpg" # Здесь будет загрузка в Yandex Object Storage
    )
    db.add(new_discount)
    db.commit()
    db.refresh(new_discount)
    return new_discount

@app.post("/api/discounts/{discount_id}/vote")
def vote_discount(discount_id: int, is_positive: bool, db: Session = Depends(get_db)):
    """
    Голосование: "Еще есть" (True) / "Уже нет" (False).
    """
    vote = models.Vote(discount_id=discount_id, is_positive=is_positive)
    db.add(vote)
    
    # Авто-скрытие акции при 3+ отрицательных голосах
    if not is_positive:
        negative_votes = db.query(models.Vote).filter(
            models.Vote.discount_id == discount_id, 
            models.Vote.is_positive == False
        ).count()
        
        if negative_votes >= 3:
            discount = db.query(models.Discount).filter(models.Discount.id == discount_id).first()
            if discount:
                discount.active = False
    
    db.commit()
    return {"status": "success"}
