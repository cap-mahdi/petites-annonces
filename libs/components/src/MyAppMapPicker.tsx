import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapPickerProps<T extends FieldValues> {
  latitudeName: FieldPath<T>;
  longitudeName: FieldPath<T>;
  control: Control<T>;
  label?: string;
  defaultCenter?: [number, number];
  className?: string;
}

function LocationMarker({
  position,
  setPosition,
}: {
  position: [number, number] | null;
  setPosition: (pos: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : <Marker position={position} />;
}

export function MyAppMapPicker<T extends FieldValues>({
  latitudeName,
  longitudeName,
  control,
  label = "Sélectionner l'emplacement sur la carte",
  defaultCenter = [48.8566, 2.3522], // Paris by default
  className = "",
}: MapPickerProps<T>) {
  const [mapPosition, setMapPosition] = useState<[number, number] | null>(null);

  return (
    <div className={className}>
      <label className="block text-sm font-bold text-gray-800 mb-3">
        {label}
      </label>

      <Controller
        name={latitudeName}
        control={control}
        render={({ field: { onChange: onLatChange, value: latValue } }) => (
          <Controller
            name={longitudeName}
            control={control}
            render={({
              field: { onChange: onLonChange, value: lonValue },
            }) => {
              useEffect(() => {
                if (latValue && lonValue) {
                  setMapPosition([Number(latValue), Number(lonValue)]);
                }
              }, [latValue, lonValue]);

              const handlePositionChange = (pos: [number, number]) => {
                setMapPosition(pos);
                onLatChange(pos[0]);
                onLonChange(pos[1]);
              };

              return (
                <div>
                  <div className="h-96 rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg">
                    <MapContainer
                      center={mapPosition || defaultCenter}
                      zoom={13}
                      className="h-full w-full"
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <LocationMarker
                        position={mapPosition}
                        setPosition={handlePositionChange}
                      />
                    </MapContainer>
                  </div>

                  {mapPosition && (
                    <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Latitude:</span>{" "}
                        {mapPosition[0].toFixed(6)} |{" "}
                        <span className="font-semibold">Longitude:</span>{" "}
                        {mapPosition[1].toFixed(6)}
                      </p>
                    </div>
                  )}
                </div>
              );
            }}
          />
        )}
      />
    </div>
  );
}
