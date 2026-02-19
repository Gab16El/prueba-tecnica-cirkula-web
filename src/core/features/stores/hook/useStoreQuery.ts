import { useQuery } from '@tanstack/react-query';
import { getStores } from '../services/store.service';

// Lima, Miraflores como coordenadas por defecto
const DEFAULT_COORDS = {
    latitude: -12.1211,
    longitude: -77.0282,
};

export const useStoresQuery = (coords = DEFAULT_COORDS) => {
    return useQuery({
        queryKey: ['stores', coords.latitude, coords.longitude],
        queryFn: () => getStores(coords),
        select: (data) => data.stores,
    });
};