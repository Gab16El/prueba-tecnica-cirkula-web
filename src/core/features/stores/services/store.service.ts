import cirkulaApi from '@/api/cirkulaApi';
import type {
    StoreFormValues, StoreFormValuesForUpdate, StoresList, StoresResponse
} from '../types/cirkula.types';

interface GetStoresParams {
    latitude: number;
    longitude: number;
}

export const getStores = async ({ latitude, longitude }: GetStoresParams): Promise<StoresResponse> => {
    const { data } = await cirkulaApi.get<StoresResponse>('/stores', {
        params: { latitude, longitude }
    });
    return data;
}

export const createStore = async (formValues: StoreFormValues, banner?: File | null): Promise<StoresList> => {
    const formData = new FormData();
    formData.append('name', formValues.name);
    formData.append('latitude', formValues.latitude.toString());
    formData.append('longitude', formValues.longitude.toString());
    formData.append('openTime', formValues.openTime);
    formData.append('closeTime', formValues.closeTime);
    if (banner) formData.append('banner', banner);

    const { data } = await cirkulaApi.post<StoresList>('/stores', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
}

export const updateStore = async (formValues: StoreFormValuesForUpdate, banner?: File | null): Promise<StoresList> => {
    const formData = new FormData();
    formData.append('id', formValues.id.toString());
    formData.append('name', formValues.name);
    formData.append('latitude', formValues.latitude.toString());
    formData.append('longitude', formValues.longitude.toString());
    formData.append('openTime', formValues.openTime);
    formData.append('closeTime', formValues.closeTime);
    if (banner) formData.append('banner', banner);

    const { data } = await cirkulaApi.put<StoresList>(`/stores/${formValues.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
}

export const deleteStore = async (id: number) => {
    const { data } = await cirkulaApi.delete(`/stores/${id}`)
    return data;
}
