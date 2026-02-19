import { useRef, useState } from 'react';

interface UseFormOptions<T> {
    initialValues: T;
    validate?: (values: T) => Partial<Record<keyof T, string>>;
    onSubmit?: (values: T) => void;
}

export const useForm = <T extends Record<string, any>>({ initialValues, validate, onSubmit }: UseFormOptions<T>) => {
    const [formValues, setFormValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

    const validateRef = useRef(validate);

    const setValidate = (newValidate: typeof validate) => {
        validateRef.current = newValidate;
    };

    const handleChange = (e: any) => {
        const { name } = e.target;
        let value: any = e.target.value;

        setFormValues(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e: React.FormEvent): Promise<boolean> => {
        e.preventDefault();

        const currentValidate = validateRef.current;
        if (currentValidate) {
            const validationErrors = currentValidate(formValues);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return false;
            }
        }

        if (onSubmit) {
            try {
                await onSubmit(formValues);
                return true;
            } catch (error) {
                return false;
            }
        }

        return true;
    }


    const setFieldValue = (name: keyof T, value: any) => {
        setFormValues((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const resetForm = (newValues?: T) => {
        setFormValues(newValues || initialValues);
        setErrors({});
    };

    return {
        formValues,
        errors,
        handleChange,
        handleSubmit,
        resetForm,
        setFormValues,
        setErrors,
        setFieldValue,
        setValidate
    }
}