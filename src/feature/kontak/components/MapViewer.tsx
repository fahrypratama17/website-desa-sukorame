"use client";

import { useState, useMemo } from "react";
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { FiMapPin, FiBriefcase, FiHome, FiShoppingBag, FiInfo, FiActivity } from 'react-icons/fi';
import { FaBuilding, FaMosque, FaSchool, FaTree, FaHospital, FaHandshake, FaMonument, FaStore, FaArchway, FaUniversity } from 'react-icons/fa';
import type { Location } from "@prisma/client";

const iconMap: Record<string, any> = {
  FaBuilding, FaMosque, FaSchool, FaTree, FaHospital, FaHandshake, FaMonument, FaStore, FaArchway, FaUniversity, FiMapPin, FiBriefcase, FiHome, FiShoppingBag, FiInfo, FiActivity
};

const filterCategories: Record<string, string> = {
  FaBuilding: "Pemerintahan",
  FaMosque: "Tempat Ibadah",
  FaSchool: "Pendidikan",
  FaUniversity: "Universitas/Kampus",
  FaTree: "Ruang Terbuka",
  FaHospital: "Faskes",
  FaHandshake: "Koperasi",
  FaMonument: "Situs/Makam",
  FaStore: "Toko/Warung",
  FaArchway: "Gapura/Tugu",
  FiBriefcase: "Bisnis",
  FiHome: "Pemukiman",
  FiMapPin: "Umum",
  FiShoppingBag: "Belanja",
  FiInfo: "Informasi",
  FiActivity: "Lainnya"
};

// Menggunakan style OpenStreetMap Raster (dijamin jalan terlihat jelas di desa)
const OSM_STYLE = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap Contributors",
      maxzoom: 19,
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

export default function MapViewer({ locations = [] }: { locations?: Location[] }) {
  const [popupInfo, setPopupInfo] = useState<Location | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("Semua");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const presentCategories = useMemo(() => {
    const cats = new Set<string>();
    locations.forEach(loc => {
      const cat = filterCategories[loc.icon || 'FiMapPin'] || "Lainnya";
      cats.add(cat);
    });
    
    // Urutan prioritas logis
    const categoryOrder = [
      "Semua",
      "Pemerintahan",
      "Universitas/Kampus",
      "Pendidikan",
      "Faskes",
      "Tempat Ibadah",
      "Gapura/Tugu",
      "Situs/Makam",
      "Koperasi",
      "Toko/Warung",
      "Bisnis",
      "Pemukiman",
      "Ruang Terbuka",
      "Belanja",
      "Informasi",
      "Umum",
      "Lainnya"
    ];

    return ["Semua", ...Array.from(cats)].sort((a, b) => {
      const indexA = categoryOrder.indexOf(a);
      const indexB = categoryOrder.indexOf(b);
      // Jika tidak ada di daftar prioritas, taruh di paling bawah
      const posA = indexA === -1 ? 999 : indexA;
      const posB = indexB === -1 ? 999 : indexB;
      
      if (posA !== posB) return posA - posB;
      return a.localeCompare(b);
    });
  }, [locations]);

  const filteredLocations = useMemo(() => {
    if (activeFilter === "Semua") return locations;
    return locations.filter(loc => {
      const cat = filterCategories[loc.icon || 'FiMapPin'] || "Lainnya";
      return cat === activeFilter;
    });
  }, [locations, activeFilter]);

  // Set initial view state to Kantor Desa or center of Sukorame
  const initialViewState = {
    longitude: locations.length > 0 ? locations[0].longitude : 112.380401,
    latitude: locations.length > 0 ? locations[0].latitude : -8.220669,
    zoom: 15,
    pitch: 0, // 0 = Pandangan lurus dari atas (top-down)
  };

  const pins = useMemo(
    () =>
      filteredLocations.map((loc) => {
        const IconComponent = iconMap[loc.icon || 'FiMapPin'] || FiMapPin;
        return (
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
            <div className="cursor-pointer transition-transform hover:scale-110 flex flex-col items-center relative group">
              <div 
                className="p-2.5 rounded-full shadow-lg border-[3px] border-white flex items-center justify-center text-white relative z-10"
                style={{ backgroundColor: loc.color || '#0A2615' }}
              >
                <IconComponent className="w-5 h-5" />
              </div>
              {/* Segitiga panah ke bawah */}
              <div 
                className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] relative z-10"
                style={{ borderTopColor: loc.color || '#0A2615' }}
              ></div>

              {/* Label Nama (Pill) */}
              <div className="absolute top-full mt-0.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm border border-gray-100 whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                <span className="font-inter-600 text-[11px] text-[#1C3F2D]">{loc.name}</span>
              </div>
            </div>
          </Marker>
        );
      }),
    [filteredLocations]
  );

  return (
    <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-sm border border-gray-200">
      <style dangerouslySetInnerHTML={{__html: `
        .custom-popup .maplibregl-popup-content {
          border-radius: 16px;
          padding: 0;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          border: 1px solid #f3f4f6;
        }
        .custom-popup .maplibregl-popup-close-button {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: #f3f4f6;
          color: transparent !important; /* Sembunyikan 'x' bawaan */
          right: 12px;
          top: 12px;
          padding: 0;
          transition: all 0.2s ease;
          z-index: 10;
          /* Gunakan SVG X modern yang presisi di tengah */
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234b5563' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M6 18L18 6M6 6l12 12'/%3E%3C/svg%3E");
          background-size: 16px;
          background-position: center;
          background-repeat: no-repeat;
        }
        .custom-popup .maplibregl-popup-close-button:hover {
          background-color: #e5e7eb;
          /* Warna ikon lebih gelap saat di-hover */
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23111827' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M6 18L18 6M6 6l12 12'/%3E%3C/svg%3E");
        }
      `}} />
      
      {/* Kategori Filter Dropdown */}
      <div className="absolute top-4 left-4 z-10">
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-md border border-gray-100 hover:bg-gray-50 transition-colors font-inter-600 text-sm text-[#1C3F2D]"
          >
            <FiMapPin className="w-4 h-4 text-[#2B694D]" />
            <span>{activeFilter === 'Semua' ? 'Semua Kategori' : activeFilter}</span>
            <svg className={`w-4 h-4 transition-transform text-gray-500 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-52 max-h-[250px] overflow-y-auto bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 py-2 z-20">
              {presentCategories.length > 0 && presentCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveFilter(cat);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-inter-500 hover:bg-[#F0FDF4] transition-colors flex items-center justify-between ${
                    activeFilter === cat ? 'text-[#1C3F2D] bg-[#F0FDF4]' : 'text-gray-600'
                  }`}
                >
                  {cat === 'Semua' ? 'Semua Lokasi' : cat}
                  {activeFilter === cat && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2B694D]"></div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Map
        initialViewState={initialViewState}
        mapStyle={OSM_STYLE as any}
        mapLib={maplibregl}
        maxZoom={19}
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />

        {pins}

        {popupInfo && (
          <Popup
            anchor="bottom"
            offset={[0, -50]}
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            onClose={() => setPopupInfo(null)}
            closeButton={true}
            closeOnClick={false}
            className="z-50 custom-popup"
            maxWidth="320px"
          >
            <div className="p-5 pt-6 font-inter-400">
              <h3 className="font-montserrat-700 text-lg text-[#1C3F2D] mb-2 pr-4">{popupInfo.name}</h3>
              <div className="w-12 h-1 bg-[#2B694D] rounded-full mb-3"></div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{popupInfo.description}</p>
              
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${popupInfo.latitude},${popupInfo.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#166534] font-inter-600 text-sm rounded-xl transition-colors border border-[#BBF7D0]"
              >
                <FiMapPin className="w-4 h-4" />
                <span>Rute via Google Maps</span>
              </a>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
