import type {
  InternalAd,
  CreateInternalAdDto,
  UpdateInternalAdDto,
  ApiResponse,
} from "@my-app/types";

const API_URL = "http://localhost:3333/api";

export const adsApi = {
  // Get all ads
  getAll: async (): Promise<InternalAd[]> => {
    const response = await fetch(`${API_URL}/ads`);
    if (!response.ok)
      throw new Error("Erreur lors de la récupération des annonces");
    const data = (await response.json()) as ApiResponse<InternalAd[]>;
    return data.data;
  },

  // Get ad by ID
  getById: async (id: string): Promise<InternalAd> => {
    const response = await fetch(`${API_URL}/ads/${id}`);
    if (!response.ok)
      throw new Error("Erreur lors de la récupération de l'annonce");
    const data = (await response.json()) as ApiResponse<InternalAd>;
    return data.data;
  },

  // Create new ad
  create: async (data: CreateInternalAdDto): Promise<InternalAd> => {
    const response = await fetch(`${API_URL}/ads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = (await response.json()) as { message?: string };
      throw new Error(
        error.message || "Erreur lors de la création de l'annonce"
      );
    }
    const result = (await response.json()) as ApiResponse<InternalAd>;
    return result.data;
  },

  // Update ad
  update: async (
    id: string,
    data: UpdateInternalAdDto
  ): Promise<InternalAd> => {
    const response = await fetch(`${API_URL}/ads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = (await response.json()) as { message?: string };
      throw new Error(
        error.message || "Erreur lors de la mise à jour de l'annonce"
      );
    }
    const result = (await response.json()) as ApiResponse<InternalAd>;
    return result.data;
  },

  // Delete ad
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/ads/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = (await response.json()) as { message?: string };
      throw new Error(
        error.message || "Erreur lors de la suppression de l'annonce"
      );
    }
  },
};
