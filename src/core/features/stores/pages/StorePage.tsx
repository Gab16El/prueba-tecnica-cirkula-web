import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useState } from 'react';
import { useForm, useFormValidation } from '@/core/hooks/shared';
import { storeFields, storeInitialValues } from '../forms/store.form';
import { ImageUpload } from '@/core/components/shared/inputs/ImageUpload';
import { InputCard } from '@/core/components/shared/inputs/InputCard';
import { Button } from '@/core/components/shared/ui/Button';
import { ListRestart, Save } from 'lucide-react';
import { useCreateStoreMutation } from '../hook/useStoreMutation';
import { StoreList } from '../components/StoreLits';
import { useStoresQuery } from '../hook/useStoreQuery';
import { LocationPicker } from '../../map/LocationPicker';

export const StorePage = () => {
  const { validate } = useFormValidation(storeFields);
  const [banner, setBanner] = useState<File | null>(null);
  const [markerPos, setMarkerPos] = useState<[number, number] | null>(null);
  const { mutate: createStore, isPending: isAddingStore } = useCreateStoreMutation();
  const { data: stores, isLoading: isLoadingStores } = useStoresQuery();

  const { formValues, errors, handleChange, handleSubmit, setFieldValue, resetForm } = useForm({
    initialValues: storeInitialValues,
    validate,
    onSubmit: (values) => {
      createStore({
        formValues: {
          ...values,
          latitude: parseFloat(values.latitude),
          longitude: parseFloat(values.longitude),
        },
        banner,
      });
      resetForm();
      setBanner(null);
      setMarkerPos(null);
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
            <StoreList stores={stores || []} isLoading={isLoadingStores} />
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
                buttonIsLoading={isAddingStore}
                loadingText='Creando Tienda...'
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