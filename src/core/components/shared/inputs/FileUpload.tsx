import { useRef, useState } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import Swal from 'sweetalert2';

interface FileUploadProps {
    name: string;
    label: string;
    value: File | null;
    onChange: (file: File | null) => void;
    error?: string;
    accept?: string;
    maxSize?: number;
    helperText?: string;
    required?: boolean;
}

const toast = Swal.mixin({
    toast: true,
    position: 'bottom-right',
    iconColor: 'white',
    customClass: { popup: 'colored-toast' },
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
});

export const FileUpload = ({
    name,
    label,
    value,
    onChange,
    error,
    accept = '.pdf',
    maxSize = 4,
    helperText = 'Solo archivos PDF, máximo 4MB',
}: FileUploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (file: File | null) => {
        if (!file) { onChange(null); return; }

        // Validar tipo
        const acceptedTypes = accept.split(',').map(t => t.trim());
        const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`;
        const isValidType = acceptedTypes.some(t =>
            file.type.includes(t.replace('.', '')) || fileExt === t
        );
        if (!isValidType) {
            toast.fire({ icon: 'info', title: 'Tipo de archivo no permitido', text: `Solo se permiten archivos ${accept}` });
            return;
        }

        // Validar tamaño
        if (file.size / (1024 * 1024) > maxSize) {
            toast.fire({ icon: 'info', text: `El archivo no debe superar ${maxSize}MB` });
            return;
        }

        onChange(file);
    };

    const handleRemove = () => {
        onChange(null);
        if (inputRef.current) inputRef.current.value = '';
    };

    return (
        <div className="w-full">
            <label className={`block text-sm font-medium mb-2 transition-colors ${error ? 'text-red-600' : 'text-gray-700'}`}>
                {label}
            </label>
            <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileChange(e.dataTransfer.files?.[0] || null); }}
                className={`
                    relative border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all duration-200
                    ${isDragging ? 'border-whale-500 bg-whale-50' : ''}
                    ${value
                        ? 'bg-green-50 border-green-500'
                        : error
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 hover:border-whale-500 hover:bg-gray-50'
                    }
                `}
            >
                <input
                    ref={inputRef}
                    id={name}
                    type="file"
                    name={name}
                    accept={accept}
                    onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                    className="hidden"
                />

                {!value ? (
                    <div className="text-center">
                        <Upload className={`mx-auto mb-3 ${error ? 'text-red-400' : 'text-gray-400'}`} size={40} />
                        <p className="text-sm text-gray-600 mb-1">
                            <span className="font-medium text-whale-700">Haz clic para subir</span> o arrastra el archivo aquí
                        </p>
                        <p className="text-xs text-gray-500">{helperText}</p>
                    </div>
                ) : (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FileText className="text-green-600" size={32} />
                            <div>
                                <p className="text-sm font-medium text-gray-900 truncate max-w-50">{value.name}</p>
                                <p className="text-xs text-gray-500">{(value.size / 1024).toFixed(2)} KB</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="text-green-600" size={20} />
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                                className="p-1 hover:bg-red-100 rounded transition-colors"
                            >
                                <X className="text-red-600" size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={16} /> {error}
                </p>
            )}
        </div>
    )
}