import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { StoreFormValues, StoreFormValuesForUpdate } from '../types/cirkula.types';
import { createStore, deleteStore, updateStore } from '../services/store.service';
import Swal from 'sweetalert2';

const toast = Swal.mixin({
    toast: true,
    position: 'bottom-right',
    iconColor: 'white',
    customClass: { popup: 'colored-toast' },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});


export const useCreateStoreMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ formValues, banner }: { formValues: StoreFormValues, banner?: File | null }) =>
            createStore(formValues, banner),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stores'] });
            toast.fire({ icon: 'success', title: 'Tienda creada exitosamente' });
        },
        onError: () => {
            toast.fire({ icon: 'error', title: 'Error al crear la tienda' });
        }
    });
};

export const useUpdateStoreMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ formValues, banner }: { formValues: StoreFormValuesForUpdate, banner?: File | null }) =>
            updateStore(formValues, banner),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stores'] });
            toast.fire({ icon: 'success', title: 'Tienda actualizada exitosamente' });
        },
        onError: () => {
            toast.fire({ icon: 'error', title: 'Error al actualizar la tienda' });
        }
    });
};

export const useDeleteStoreMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteStore(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stores'] });
            toast.fire({ icon: 'success', title: 'Tienda eliminada exitosamente' });
        },
        onError: () => {
            toast.fire({ icon: 'error', title: 'Error al eliminar la tienda' });
        }
    });
};