from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, DateTime, func
from sqlalchemy.orm import declarative_base, relationship
from geoalchemy2 import Geometry

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    yandex_id = Column(String, unique=True, index=True, nullable=True)
    telegram_id = Column(String, unique=True, index=True, nullable=True)
    username = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now())

class Store(Base):
    __tablename__ = "stores"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    address = Column(String, nullable=False)
    # Гео-точка для PostGIS (долгота, широта)
    location = Column(Geometry('POINT', srid=4326), nullable=False) 
    created_at = Column(DateTime, server_default=func.now())

class Discount(Base):
    __tablename__ = "discounts"
    id = Column(Integer, primary_key=True, index=True)
    store_id = Column(Integer, ForeignKey("stores.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    category = Column(String, index=True, nullable=False)
    
    old_price = Column(Float, nullable=True)
    new_price = Column(Float, nullable=False)
    discount_percentage = Column(Float, nullable=True)
    
    needs_loyalty_card = Column(Boolean, default=False)
    min_items_required = Column(Integer, nullable=True)
    
    photo_url = Column(String, nullable=True)
    active = Column(Boolean, default=True) # Скрывается при 3+ негативных голосах
    end_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    
    store = relationship("Store")

class Vote(Base):
    __tablename__ = "votes"
    id = Column(Integer, primary_key=True, index=True)
    discount_id = Column(Integer, ForeignKey("discounts.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True) # Может быть NULL для гостей
    is_positive = Column(Boolean, nullable=False) # True = "Еще есть", False = "Уже нет"
    ip_address = Column(String, nullable=True) # Для защиты от накрутки без реги
    created_at = Column(DateTime, server_default=func.now())
