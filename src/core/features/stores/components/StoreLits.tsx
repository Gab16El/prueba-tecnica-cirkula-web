import type { StoresList } from '../types/cirkula.types';

interface StoreListProps {
    stores: StoresList[];
    isLoading?: boolean;
}

export const StoreList = ({ stores, isLoading }: StoreListProps) => {
    if (isLoading) return (
        <div className="p-8 text-center text-gray-400 text-sm">Cargando tiendas...</div>
    );

    if (stores.length === 0) return (
        <div className="p-8 text-center text-gray-400 text-sm">No hay tiendas registradas</div>
    );

    return (
        <div className="divide-y divide-gray-100">
            {stores && stores.map(store => (
                <div key={store.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                        {store.bannerUrl && (
                            <img src={store.bannerUrl} alt={store.name} className="w-10 h-10 rounded-lg object-cover" />
                        )}
                        <div>
                            <p className="font-medium text-gray-800">{store.name}</p>
                            <p className="text-sm text-gray-500">{store.openTime} - {store.closeTime}</p>
                            <p className="text-xs text-gray-400">{store.latitude}, {store.longitude}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${store.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {store.isOpen ? 'Abierto' : 'Cerrado'}
                        </span>
                        <span className="text-xs text-gray-500">{store.distanceInKm} km</span>
                    </div>
                </div>
            ))}
        </div>
    );
};