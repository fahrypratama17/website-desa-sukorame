"use client";

import { useState, useMemo } from "react";
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { villageLocations, MapLocation } from "../data/locations";

// Menggunakan style OpenStreetMap Raster (dijamin jalan terlihat jelas di desa)
const OSM_STYLE = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap Contributors",
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm",
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

export default function MapViewer() {
  const [popupInfo, setPopupInfo] = useState<MapLocation | null>(null);

  // Set initial view state to Kantor Desa
  const initialViewState = {
    longitude: villageLocations[0].longitude,
    latitude: villageLocations[0].latitude,
    zoom: 15,
    pitch: 0, // 0 = Pandangan lurus dari atas (top-down)
  };

  const pins = useMemo(
    () =>
      villageLocations.map((loc) => (
        <Marker
          key={`marker-${loc.id}`}
          longitude={loc.longitude}
          latitude={loc.latitude}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(loc);
          }}
        >
          <div className="cursor-pointer transition-transform hover:scale-110 flex flex-col items-center">
            <div 
              className="p-2.5 rounded-full shadow-lg border-[3px] border-white flex items-center justify-center text-white"
              style={{ backgroundColor: loc.color }}
            >
              <loc.icon className="w-5 h-5" />
            </div>
            {/* Segitiga panah ke bawah */}
            <div 
              className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px]"
              style={{ borderTopColor: loc.color }}
            ></div>
          </div>
        </Marker>
      )),
    []
  );

  return (
    <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-sm border border-gray-200">
      <Map
        initialViewState={initialViewState}
        mapStyle={OSM_STYLE as any}
        mapLib={maplibregl}
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />

        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            onClose={() => setPopupInfo(null)}
            closeButton={true}
            closeOnClick={false}
            className="z-50"
            maxWidth="320px"
          >
            <div className="p-3 font-inter-400">
              <h3 className="font-montserrat-700 text-lg text-[#1C3F2D] mb-1.5">{popupInfo.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{popupInfo.description}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
