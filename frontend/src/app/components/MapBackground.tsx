"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapBackground() {
  return (
    <MapContainer 
      center={[55.751574, 37.573856]} // Москва по умолчанию
      zoom={13} 
      zoomControl={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
      />
    </MapContainer>
  );
}
