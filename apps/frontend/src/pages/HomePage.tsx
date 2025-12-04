import React from 'react';
import { useGetAds, useDeleteAd } from '@my-app/hooks';
import { AdCard, Button } from '@my-app/components';
import { useAdStore } from '../store/ad.store';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { data: ads, isLoading, error } = useGetAds();
  const deleteAdMutation = useDeleteAd();
  const { setSelectedAd, openForm } = useAdStore();

  const handleCreateNew = () => {
    setSelectedAd(null);
    navigate('/create');
  };

  const handleEdit = (id: string) => {
    const ad = ads?.find((a) => a.id === id);
    if (ad) {
      setSelectedAd(ad);
      navigate('/edit');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      try {
        await deleteAdMutation.mutateAsync(id);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">Erreur: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Petites Annonces Internes</h1>
        <Button label="Créer une annonce" onClick={handleCreateNew} />
      </div>

      {ads && ads.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Aucune annonce disponible</p>
          <Button
            label="Créer la première annonce"
            onClick={handleCreateNew}
            className="mt-4"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads?.map((ad) => (
            <AdCard
              key={ad.id}
              ad={ad}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
