export type LocationDetails = {
  city: string; // ville
  district: string; // cité / quartier
  postalCode: string; // code postal
  street: string; // rue
  country: string; // pays
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Address = {
  locationDetails: LocationDetails;
  coordinates: Coordinates;
};
