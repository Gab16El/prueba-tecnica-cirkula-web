export interface FieldConfig {
    name: string;
    label: string;
    type?: string;
    regex?: RegExp;
    errorMessage?: string;
    maxLength?: number;
    minLength?: number;
    required?: boolean;
}

export const useFormValidation = (fields: FieldConfig[]) => {
    const validate = <T extends Record<string, any>>(values: T): Partial<Record<keyof T, string>> => {
        const errors: Partial<Record<keyof T, string>> = {};

        fields.forEach((field) => {
            const value = values[field.name];
            const stringValue = typeof value === 'string' ? value.trim() : '';

            if (field.required) {
                const isEmpty =
                    value === undefined ||
                    value === null ||
                    value === '' ||
                    (typeof value === 'string' && stringValue === '') ||
                    (Array.isArray(value) && value.length === 0);

                if (isEmpty) {
                    errors[field.name as keyof T] = `${field.label} es obligatorio`;
                    return;
                }
            }

            if (!field.required && stringValue === '') {
                return;
            }

            if (field.minLength && stringValue.length < field.minLength) {
                errors[field.name as keyof T] =
                    field.errorMessage ||
                    `${field.label} debe tener al menos ${field.minLength} caracteres`;
                return;
            }

            if (field.maxLength && stringValue.length > field.maxLength) {
                errors[field.name as keyof T] =
                    field.errorMessage ||
                    `${field.label} no puede exceder ${field.maxLength} caracteres`;
                return;
            }

            if (field.regex && stringValue !== '') {
                if (!field.regex.test(stringValue)) {
                    errors[field.name as keyof T] =
                        field.errorMessage ||
                        `${field.label} tiene un formato inválido`;
                    return;
                }
            }
        });

        return errors;
    }

    return { validate };
}