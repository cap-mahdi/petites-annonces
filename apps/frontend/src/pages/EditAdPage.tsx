import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUpdateAd } from "@my-app/hooks";
import {
  MyAppButton,
  MyAppFormInput,
  MyAppFormCheckbox,
} from "@my-app/components";
import { useAdStore } from "../store/ad.store";
import { updateInternalAdSchema } from "@my-app/schema";
import type { UpdateInternalAdDto } from "@my-app/types";
import { zodResolver } from "@hookform/resolvers/zod";

export const EditAdPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedAd } = useAdStore();
  const updateAdMutation = useUpdateAd();

  const { control, handleSubmit, reset } = useForm<UpdateInternalAdDto>({
    resolver: zodResolver(updateInternalAdSchema),
  });

  useEffect(() => {
    if (!selectedAd) {
      navigate("/");
    } else {
      reset(selectedAd);
    }
  }, [selectedAd, navigate, reset]);

  if (!selectedAd) return null;

  const onSubmit = async (data: UpdateInternalAdDto) => {
    try {
      await updateAdMutation.mutateAsync({ id: selectedAd.id, data });
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-8">
          <MyAppButton
            variant="link"
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-800 mb-4 flex items-center gap-2 cursor-pointer"
          >
            ← Retour
          </MyAppButton>
          <h1 className="text-4xl font-bold text-gray-800">
            Modifier l'annonce
          </h1>
          <p className="text-gray-600 mt-2">
            Mettez à jour les informations ci-dessous
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl shadow-xl p-10 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-4 mb-6">
              Informations générales
            </h2>

            <MyAppFormInput
              name="title"
              control={control}
              label="Titre"
              placeholder="Titre de l'annonce"
            />

            <MyAppFormInput
              name="description"
              control={control}
              label="Description"
              type="textarea"
              rows={4}
              placeholder="Description détaillée de votre annonce"
            />

            <MyAppFormInput
              name="price"
              control={control}
              label="Prix (€)"
              type="number"
              min="0"
              placeholder="0"
            />
          </div>

          {/* Address */}
          <div className="bg-white rounded-2xl shadow-xl p-10 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-4 mb-6">
              Adresse
            </h2>

            <MyAppFormInput
              name="address.locationDetails.street"
              control={control}
              label="Rue"
              placeholder="123 Rue de la Paix"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MyAppFormInput
                name="address.locationDetails.city"
                control={control}
                label="Ville"
                placeholder="Paris"
              />
              <MyAppFormInput
                name="address.locationDetails.district"
                control={control}
                label="Quartier"
                placeholder="Quartier"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MyAppFormInput
                name="address.locationDetails.postalCode"
                control={control}
                label="Code postal"
                placeholder="75000"
              />
              <MyAppFormInput
                name="address.locationDetails.country"
                control={control}
                label="Pays"
                placeholder="France"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MyAppFormInput
                name="address.coordinates.latitude"
                control={control}
                label="Latitude"
                type="number"
                step="any"
                placeholder="48.8566"
              />
              <MyAppFormInput
                name="address.coordinates.longitude"
                control={control}
                label="Longitude"
                type="number"
                step="any"
                placeholder="2.3522"
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-2xl shadow-xl p-10 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-4 mb-6">
              Équipements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MyAppFormInput
                name="amenities.rooms"
                control={control}
                label="Pièces"
                type="number"
                min="1"
                placeholder="3"
              />
              <MyAppFormInput
                name="amenities.bathrooms"
                control={control}
                label="Salles de bain"
                type="number"
                min="0"
                placeholder="1"
              />
              <MyAppFormInput
                name="amenities.toilets"
                control={control}
                label="Toilettes"
                type="number"
                min="0"
                placeholder="2"
              />
            </div>

            <div className="flex gap-8 pt-2">
              <MyAppFormCheckbox
                name="amenities.garage"
                control={control}
                label="Garage"
              />
              <MyAppFormCheckbox
                name="amenities.balcony"
                control={control}
                label="Balcon"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
            <MyAppButton
              type="button"
              label="Annuler"
              variant="secondary"
              onClick={() => navigate("/")}
              className="w-full sm:w-auto"
            />
            <MyAppButton
              type="submit"
              label={
                updateAdMutation.isPending ? "Mise à jour..." : "Enregistrer"
              }
              disabled={updateAdMutation.isPending}
              className="w-full sm:w-auto min-w-[180px]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
