import type React from 'react';
import type { LucideIcon } from 'lucide-react';

interface InputCardProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
}

export const InputCard = ({
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
  placeholder,
  ...props
}: InputCardProps) => {
  return (
    <div className={`relative w-full ${spaceBottom}`}>
      {/* Label */}
      <label
        htmlFor={name}
        className={`block text-sm font-medium mb-2 transition-colors ${error ? 'text-red-600' : 'text-gray-700'
          }`}
      >
        {label}
      </label>

      {/* Input Container */}
      <div className="relative">
        {/* Icono (si existe) */}
        {Icon && (
          <Icon
            className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-400' : 'text-gray-400'
              }`}
            size={20}
          />
        )}

        {/* Input */}
        <input
          id={name}
          type={type}
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
            ${Icon ? 'pl-10 pr-4' : 'px-4'}
            ${error
              ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
              : 'border-gray-300 focus:ring-whale-500 focus:border-transparent'
            }
          `}
          {...props}
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
}