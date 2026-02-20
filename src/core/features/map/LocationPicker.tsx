import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapEvents } from 'react-leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
});

export const LocationPicker = ({ onSelect }: { onSelect: (lat: number, lng: number) => void }) => {
    useMapEvents({ click(e) { onSelect(e.latlng.lat, e.latlng.lng); } });
    return null;
};