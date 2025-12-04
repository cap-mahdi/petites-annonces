import React from "react";
import type { InternalAd } from "@my-app/types";

interface AdCardProps {
  ad: InternalAd;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const AdCard: React.FC<AdCardProps> = ({ ad, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-2">{ad.title}</h3>
      <p className="text-gray-600 mb-4">{ad.description}</p>

      <div className="mb-4">
        <p className="text-2xl font-bold text-blue-600">
          {ad.price.toLocaleString("fr-FR")} €
        </p>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Adresse</h4>
        <p className="text-sm text-gray-600">
          {ad.address.locationDetails.street}, {ad.address.locationDetails.city}
        </p>
        <p className="text-sm text-gray-600">
          {ad.address.locationDetails.postalCode},{" "}
          {ad.address.locationDetails.country}
        </p>
        <p className="text-sm text-gray-500">
          Quartier: {ad.address.locationDetails.district}
        </p>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Équipements</h4>
        <div className="flex flex-wrap gap-2">
          <span className="text-sm bg-gray-100 px-2 py-1 rounded">
            {ad.amenities.rooms} pièces
          </span>
          <span className="text-sm bg-gray-100 px-2 py-1 rounded">
            {ad.amenities.bathrooms} salle(s) de bain
          </span>
          <span className="text-sm bg-gray-100 px-2 py-1 rounded">
            {ad.amenities.toilets} toilette(s)
          </span>
          {ad.amenities.garage && (
            <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
              Garage
            </span>
          )}
          {ad.amenities.balcony && (
            <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
              Balcon
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        {onEdit && (
          <button
            onClick={() => onEdit(ad.id)}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Modifier
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(ad.id)}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Supprimer
          </button>
        )}
      </div>
    </div>
  );
};
