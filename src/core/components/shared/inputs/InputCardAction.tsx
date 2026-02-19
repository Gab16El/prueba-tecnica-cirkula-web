import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';

interface InputCardActionProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    icon?: LucideIcon;
    spaceBottom?: string;
    maxLength?: number;
    readOnly?: boolean;
    showPasswordToggle?: boolean; // ara inputs de contraseña
    actionIcon?: LucideIcon; // Icono personalizado de acción
    onActionClick?: () => void; // Callback de acción
}

export const InputCardAction = ({
    name,
    type = 'text',
    label,
    value,
    onChange,
    error,
    icon: Icon,
    spaceBottom = 'mb-4',
    maxLength,
    readOnly = false,
    showPasswordToggle = false,
    actionIcon: ActionIcon,
    onActionClick,
    placeholder,
    ...props
}: InputCardActionProps) => {
    const [showPassword, setShowPassword] = useState(false);

    // Determinar el tipo de input
    const inputType = showPasswordToggle
        ? showPassword
            ? 'text'
            : 'password'
        : type;

    // Determinar el icono de acción
    const DisplayActionIcon = showPasswordToggle
        ? showPassword
            ? EyeOff
            : Eye
        : ActionIcon;

    // Handler de acción
    const handleAction = () => {
        if (showPasswordToggle) {
            setShowPassword(!showPassword);
        } else if (onActionClick) {
            onActionClick();
        }
    };

    return (
        <div className={`relative w-full ${spaceBottom}`}>
            <label
                htmlFor={name}
                className={`block text-sm font-medium mb-2 transition-colors ${error ? 'text-red-600' : 'text-gray-700'
                    }`}
            >
                {label}
            </label>

            <div className="relative">
                {Icon && (
                    <Icon
                        className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-400' : 'text-gray-400'
                            }`}
                        size={20}
                    />
                )}

                <input
                    id={name}
                    type={inputType}
                    name={name}
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    className={`
                        w-full py-3 border rounded-lg 
                        focus:outline-none focus:ring-2 transition-all
                        disabled:bg-gray-100 disabled:cursor-not-allowed
                        read-only:bg-gray-50
                        ${Icon ? 'pl-10' : 'pl-4'}
                        ${DisplayActionIcon ? 'pr-12' : 'pr-4'}
                        ${error
                            ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                            : 'border-gray-300 focus:ring-whale-500 focus:border-transparent'
                        }
                    `}
                    {...props}
                />

                {DisplayActionIcon && (
                    <button
                        type="button"
                        onClick={handleAction}
                        className={`
                            absolute right-3 top-1/2 -translate-y-1/2 
                            transition-colors hover:scale-110 active:scale-95
                            ${error ? 'text-red-400 hover:text-red-600' : 'text-gray-400 hover:text-gray-600'}
                        `}
                    >
                        <DisplayActionIcon size={20} />
                    </button>
                )}
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    {error}
                </p>
            )}
        </div>
    )
}