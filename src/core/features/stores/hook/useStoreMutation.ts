import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { StoreFormValues, StoreFormValuesForUpdate } from '../types/cirkula.types';
import { createStore, deleteStore, updateStore } from '../services/store.service';

export const useCreateStoreMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ formValues, banner }: { formValues: StoreFormValues, banner?: File | null }) =>
            createStore(formValues, banner),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stores'] });
        },
    });
};

export const useUpdateStoreMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ formValues, banner }: { formValues: StoreFormValuesForUpdate, banner?: File | null }) =>
            updateStore(formValues, banner),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stores'] });
        },
    });
};

export const useDeleteStoreMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteStore(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stores'] });
        },
    });
};