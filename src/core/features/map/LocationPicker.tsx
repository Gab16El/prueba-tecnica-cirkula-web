import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useMapEvents } from 'react-leaflet';


L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconRetinaUrl: markerIcon,
});


export const LocationPicker = ({ onSelect }: { onSelect: (lat: number, lng: number) => void }) => {
    useMapEvents({ click(e) { onSelect(e.latlng.lat, e.latlng.lng); } });
    return null;
};
