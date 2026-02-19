import { useRef, useState } from 'react';
import { X, CheckCircle, AlertCircle, ImageIcon } from 'lucide-react';
import Swal from 'sweetalert2';

interface ImageUploadProps {
    name: string;
    label: string;
    value: File | null;
    onChange: (file: File | null) => void;
    error?: string;
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

export const ImageUpload = ({
    name,
    label,
    value,
    onChange,
    error,
    maxSize = 4,
    helperText = 'PNG, JPG o WEBP, máximo 4MB',
}: ImageUploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (file: File | null) => {
        if (!file) { onChange(null); setPreview(null); return; }

        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            toast.fire({ icon: 'info', title: 'Tipo no permitido', text: 'Solo se permiten imágenes PNG, JPG, WEBP o GIF' });
            return;
        }

        if (file.size / (1024 * 1024) > maxSize) {
            toast.fire({ icon: 'info', text: `La imagen no debe superar ${maxSize}MB` });
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
        onChange(file);
    };

    const handleRemove = () => {
        onChange(null);
        setPreview(null);
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
                    relative border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 overflow-hidden
                    ${isDragging ? 'border-primary bg-primary/50' : ''}
                    ${preview
                        ? 'border-green-500'
                        : error
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 hover:border-primary hovprimary/50ay-50'
                    }
                `}
            >
                <input
                    ref={inputRef}
                    id={name}
                    type="file"
                    name={name}
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                    className="hidden"
                />

                {preview ? (
                    <div className="relative group">
                        <img
                            src={preview}
                            alt="preview"
                            className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <span className="text-white text-sm font-medium">Cambiar imagen</span>
                        </div>
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle size={12} />
                            {value && (value.size / 1024).toFixed(0)} KB
                        </div>
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                            className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                        >
                            <X className="text-white" size={16} />
                        </button>
                    </div>
                ) : (
                    <div className="p-6 text-center">
                        <ImageIcon className={`mx-auto mb-3 ${error ? 'text-red-400' : 'text-gray-400'}`} size={40} />
                        <p className="text-sm text-gray-600 mb-1">
                            <span className="font-medium text-primary">Haz clic para subir</span> o arrastra la imagen aquí
                        </p>
                        <p className="text-xs text-gray-500">{helperText}</p>
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