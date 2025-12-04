import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  InternalAd,
  CreateInternalAdDto,
  UpdateInternalAdDto,
} from "@my-app/types";
import { adsApi } from "./ads.api";

const QUERY_KEY = "ads";

// Get all ads
export const useGetAds = () => {
  return useQuery<InternalAd[], Error>({
    queryKey: [QUERY_KEY],
    queryFn: adsApi.getAll,
  });
};

// Get ad by ID
export const useGetAdById = (id: string) => {
  return useQuery<InternalAd, Error>({
    queryKey: [QUERY_KEY, id],
    queryFn: () => adsApi.getById(id),
    enabled: !!id,
  });
};

// Create ad
export const useCreateAd = () => {
  const queryClient = useQueryClient();

  return useMutation<InternalAd, Error, CreateInternalAdDto>({
    mutationFn: adsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

// Update ad
export const useUpdateAd = () => {
  const queryClient = useQueryClient();

  return useMutation<
    InternalAd,
    Error,
    { id: string; data: UpdateInternalAdDto }
  >({
    mutationFn: ({ id, data }) => adsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.id] });
    },
  });
};

// Delete ad
export const useDeleteAd = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: adsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};
