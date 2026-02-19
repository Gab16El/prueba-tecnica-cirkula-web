import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { useForm, useFormValidation } from '@/core/hooks/shared';
import { storeFields, storeInitialValues } from '../forms/store.form';
import { ImageUpload } from '@/core/components/shared/inputs/ImageUpload';
import { InputCard } from '@/core/components/shared/inputs/InputCard';
import { Button } from '@/core/components/shared/ui/Button';
import { ListRestart, Save } from 'lucide-react';

const mockStores = [
  { id: 1, name: 'Tienda A', latitude: -12.0464, longitude: -77.0428, openTime: '09:00 AM', closeTime: '07:00 PM', bannerUrl: '', distanceInKm: 1.5, isOpen: true },
  { id: 2, name: 'Tienda B', latitude: -12.0500, longitude: -77.0500, openTime: '10:00 AM', closeTime: '08:30 PM', bannerUrl: '', distanceInKm: 2.1, isOpen: false },
];

const LocationPicker = ({ onSelect }: { onSelect: (lat: number, lng: number) => void }) => {
  useMapEvents({ click(e) { onSelect(e.latlng.lat, e.latlng.lng); } });
  return null;
};

export const StorePage = () => {
  const { validate } = useFormValidation(storeFields);
  const [banner, setBanner] = useState<File | null>(null);
  const [markerPos, setMarkerPos] = useState<[number, number] | null>(null);

  const { formValues, errors, handleChange, handleSubmit, setFieldValue, resetForm } = useForm({
    initialValues: storeInitialValues,
    validate,
    onSubmit: (values) => {
      console.log('Submit:', values, banner);
    }
  });

  const handleMapClick = (lat: number, lng: number) => {
    setMarkerPos([lat, lng]);
    setFieldValue('latitude', lat.toFixed(6));
    setFieldValue('longitude', lng.toFixed(6));
  };

  return (
    <div className="p-2 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Tiendas</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-2 md:p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700">Tiendas registradas</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {mockStores.map(store => (
              <div key={store.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium text-gray-800">{store.name}</p>
                  <p className="text-sm text-gray-500">{store.openTime} - {store.closeTime}</p>
                  <p className="text-xs text-gray-400">{store.latitude}, {store.longitude}</p>
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
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 md:p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Nueva Tienda</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">

            <InputCard
              name="name"
              label="Nombre de la Tienda"
              value={formValues.name}
              onChange={handleChange}
              placeholder="Ej: Tienda A"
              error={errors.name}
              spaceBottom="mb-0"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputCard
                name="openTime"
                label="Hora de apertura"
                value={formValues.openTime}
                onChange={handleChange}
                placeholder="09:00 AM"
                error={errors.openTime}
                spaceBottom="mb-0"
              />
              <InputCard
                name="closeTime"
                label="Hora de cierre"
                value={formValues.closeTime}
                onChange={handleChange}
                placeholder="07:00 PM"
                error={errors.closeTime}
                spaceBottom="mb-0"
              />
            </div>

            {/* Mapa */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ubicación * <span className="text-xs text-gray-400 font-normal">(haz clic en el mapa)</span>
              </label>
              <div className="rounded-lg overflow-hidden border border-gray-300 h-52">
                <MapContainer center={[-12.0464, -77.0428]} zoom={13} style={{ height: '100%', width: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationPicker onSelect={handleMapClick} />
                  {markerPos && <Marker position={markerPos} />}
                </MapContainer>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <InputCard
                  name="latitude"
                  label="Latitud"
                  value={formValues.latitude}
                  onChange={handleChange}
                  placeholder="-12.0464"
                  error={errors.latitude}
                  spaceBottom="mb-0"
                />
                <InputCard
                  name="longitude"
                  label="Longitud"
                  value={formValues.longitude}
                  onChange={handleChange}
                  placeholder="-77.0428"
                  error={errors.longitude}
                  spaceBottom="mb-0"
                />
              </div>
            </div>

            <ImageUpload
              name="banner"
              label="Banner de la Tienda"
              value={banner}
              onChange={setBanner}
              helperText="PNG, JPG o WEBP, máximo 4MB"
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                onClick={() => { resetForm(); setBanner(null); setMarkerPos(null); }}
                variant="ghost"
              >
                <ListRestart size={16} />
                Limpiar
              </Button>
              <Button 
                type="submit" 
                variant="solid" 
              >
                <Save size={16} />
                Crear Tienda
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}