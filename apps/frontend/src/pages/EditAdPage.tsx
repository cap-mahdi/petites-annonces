import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateAd } from '@my-app/hooks';
import { Button } from '@my-app/components';
import { useAdStore } from '../store/ad.store';
import type { UpdateInternalAdDto } from '@my-app/types';

export const EditAdPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedAd } = useAdStore();
  const updateAdMutation = useUpdateAd();

  useEffect(() => {
    if (!selectedAd) {
      navigate('/');
    }
  }, [selectedAd, navigate]);

  if (!selectedAd) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updatedAd: UpdateInternalAdDto = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      address: {
        locationDetails: {
          city: formData.get('city') as string,
          district: formData.get('district') as string,
          postalCode: formData.get('postalCode') as string,
          street: formData.get('street') as string,
          country: formData.get('country') as string,
        },
        coordinates: {
          latitude: Number(formData.get('latitude')),
          longitude: Number(formData.get('longitude')),
        },
      },
      amenities: {
        bathrooms: Number(formData.get('bathrooms')),
        toilets: Number(formData.get('toilets')),
        garage: formData.get('garage') === 'on',
        balcony: formData.get('balcony') === 'on',
        rooms: Number(formData.get('rooms')),
      },
    };

    try {
      await updateAdMutation.mutateAsync({ id: selectedAd.id, data: updatedAd });
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Modifier l'annonce</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Informations générales</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Titre</label>
            <input
              type="text"
              name="title"
              required
              defaultValue={selectedAd.title}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              required
              rows={4}
              defaultValue={selectedAd.description}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Prix (€)</label>
            <input
              type="number"
              name="price"
              required
              min="0"
              defaultValue={selectedAd.price}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Adresse</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Rue</label>
            <input
              type="text"
              name="street"
              required
              defaultValue={selectedAd.address.locationDetails.street}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Ville</label>
              <input
                type="text"
                name="city"
                required
                defaultValue={selectedAd.address.locationDetails.city}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Quartier</label>
              <input
                type="text"
                name="district"
                required
                defaultValue={selectedAd.address.locationDetails.district}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Code postal</label>
              <input
                type="text"
                name="postalCode"
                required
                defaultValue={selectedAd.address.locationDetails.postalCode}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pays</label>
              <input
                type="text"
                name="country"
                required
                defaultValue={selectedAd.address.locationDetails.country}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Latitude</label>
              <input
                type="number"
                name="latitude"
                required
                step="any"
                defaultValue={selectedAd.address.coordinates.latitude}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Longitude</label>
              <input
                type="number"
                name="longitude"
                required
                step="any"
                defaultValue={selectedAd.address.coordinates.longitude}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Équipements</h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Pièces</label>
              <input
                type="number"
                name="rooms"
                required
                min="1"
                defaultValue={selectedAd.amenities.rooms}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Salles de bain</label>
              <input
                type="number"
                name="bathrooms"
                required
                min="0"
                defaultValue={selectedAd.amenities.bathrooms}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Toilettes</label>
              <input
                type="number"
                name="toilets"
                required
                min="0"
                defaultValue={selectedAd.amenities.toilets}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="garage"
                defaultChecked={selectedAd.amenities.garage}
                className="mr-2"
              />
              <span className="text-sm font-medium">Garage</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="balcony"
                defaultChecked={selectedAd.amenities.balcony}
                className="mr-2"
              />
              <span className="text-sm font-medium">Balcon</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            type="submit"
            label={updateAdMutation.isPending ? 'Mise à jour...' : 'Enregistrer'}
            disabled={updateAdMutation.isPending}
          />
          <Button
            type="button"
            label="Annuler"
            variant="secondary"
            onClick={() => navigate('/')}
          />
        </div>
      </form>
    </div>
  );
};
