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

export const createStore = async (formValues: StoreFormValues): Promise<StoresList> => {
    const { data } = await cirkulaApi.post<StoresList>('/stores', formValues)
    return data;
}

export const updateStore = async (formValues: StoreFormValuesForUpdate): Promise<StoresList> => {
    const { data } = await cirkulaApi.put<StoresList>(`/stores/${formValues.id}`, formValues)
    return data;
}

export const deleteStore = async (id: number) => {
    const { data } = await cirkulaApi.delete(`/stores/${id}`)
    return data;
}
