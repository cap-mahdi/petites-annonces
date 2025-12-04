import React from "react";
import { useGetAds, useDeleteAd } from "@my-app/hooks";
import { AdCard, Button } from "@my-app/components";
import { useAdStore } from "../store/ad.store";
import { useNavigate } from "react-router-dom";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { data: ads, isLoading, error } = useGetAds();
  const deleteAdMutation = useDeleteAd();
  const { setSelectedAd, openForm } = useAdStore();

  const handleCreateNew = () => {
    setSelectedAd(null);
    navigate("/create");
  };

  const handleEdit = (id: string) => {
    const ad = ads?.find((a) => a.id === id);
    if (ad) {
      setSelectedAd(ad);
      navigate("/edit");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
      try {
        await deleteAdMutation.mutateAsync(id);
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <div className="text-red-600 text-5xl mb-4">⚠️</div>
            <p className="text-xl font-semibold text-gray-800 mb-2">Erreur</p>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Petites Annonces Internes
            </h1>
            <p className="text-gray-600">
              {ads?.length || 0} annonce{ads && ads.length > 1 ? "s" : ""}{" "}
              disponible{ads && ads.length > 1 ? "s" : ""}
            </p>
          </div>
          <Button
            label="+ Créer une annonce"
            onClick={handleCreateNew}
            className="shadow-lg hover:shadow-xl"
          />
        </div>

        {ads && ads.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">📋</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Aucune annonce
              </h2>
              <p className="text-gray-600 mb-6">
                Commencez par créer votre première annonce
              </p>
              <Button
                label="Créer la première annonce"
                onClick={handleCreateNew}
              />
            </div>
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
    </div>
  );
};
