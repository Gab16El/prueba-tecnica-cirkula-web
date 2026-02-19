import { regexName, regexLatLng, regexTime, regexUrl } from '@/constants/regex';
import type { FieldConfig } from '../../../hooks/shared';

export const storeInitialValues = {
    name: "",
    bannerUrl: "",
    latitude: "",
    longitude: "",
    openTime: "",
    closeTime: ""
}

export const storeFields: FieldConfig[] = [
    {
        name: 'name',
        label: 'Nombre de la Tienda',
        type: 'text',
        required: true,
        regex: regexName,
        errorMessage: 'El nombre debe tener entre 2 y 50 caracteres',
    },
    {
        name: 'bannerUrl',
        label: 'URL del Banner',
        type: 'text',
        required: false,
        regex: regexUrl,
        errorMessage: 'Ingrese una URL válida',
    },
    {
        name: 'latitude',
        label: 'Latitud',
        type: 'text',
        required: true,
        regex: regexLatLng,
        errorMessage: 'Ingrese una latitud válida (ej: -12.0464)',
    },
    {
        name: 'longitude',
        label: 'Longitud',
        type: 'text',
        required: true,
        regex: regexLatLng,
        errorMessage: 'Ingrese una longitud válida (ej: -77.0428)',
    },
    {
        name: 'openTime',
        label: 'Hora de apertura',
        type: 'text',
        required: true,
        regex: regexTime,
        errorMessage: 'Formato: 09:00 AM',
    },
    {
        name: 'closeTime',
        label: 'Hora de cierre',
        type: 'text',
        required: true,
        regex: regexTime,
        errorMessage: 'Formato: 07:00 PM',
    },
]