export interface StoresList {
    id: number;
    name: string;
    bannerUrl: string;
    latitude: number;
    longitude: number;
    openTime: string;
    isOpen?: boolean;
    distanceInKm: string;
    closeTime: string;
}

export interface StoresResponse {
    stores: StoresList[]
}

export interface StoreFormValues {
    name: string;
    latitude: number;
    longitude: number;
    openTime: string;
    closeTime: string; 
}

export interface StoreFormValuesForUpdate extends StoreFormValues {
    id: number;
}