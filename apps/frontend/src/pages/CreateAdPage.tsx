import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCreateAd } from "@my-app/hooks";
import {
  MyAppButton,
  MyAppFormInput,
  MyAppFormCheckbox,
} from "@my-app/components";
import { createInternalAdSchema } from "@my-app/schema";
import type { CreateInternalAdDto } from "@my-app/types";
import { zodResolver } from "@hookform/resolvers/zod";

export const CreateAdPage: React.FC = () => {
  const navigate = useNavigate();
  const createAdMutation = useCreateAd();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateInternalAdDto>({
    resolver: zodResolver(createInternalAdSchema),
    defaultValues: {
      amenities: {
        garage: false,
        balcony: false,
      },
    },
  });

  const onSubmit = async (data: CreateInternalAdDto) => {
    try {
      await createAdMutation.mutateAsync(data);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la création:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8">
          <MyAppButton
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2 cursor-pointer transition-colors duration-200 font-semibold"
          >
            ← Retour
          </MyAppButton>
          <h1 className="text-4xl font-bold text-gray-800">
            Créer une annonce
          </h1>
          <p className="text-gray-600 mt-2">
            Remplissez le formulaire ci-dessous
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">
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
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">
              Adresse
            </h2>

            <MyAppFormInput
              name="address.locationDetails.street"
              control={control}
              label="Rue"
              placeholder="123 Rue de la Paix"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">
              Équipements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <div className="flex gap-4 justify-end">
            <MyAppButton
              type="button"
              label="Annuler"
              variant="secondary"
              onClick={() => navigate("/")}
            />
            <MyAppButton
              type="submit"
              label={
                createAdMutation.isPending ? "Création..." : "Créer l'annonce"
              }
              disabled={createAdMutation.isPending}
              className="min-w-[150px]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
