import { LoaderSpinner } from './LoaderSpinner';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    fullWidth?: boolean;
    buttonIsLoading?: boolean;
    loadingText?: string;
    variant?:
    | "solid"
    | "ghost"
    | "outline"
    | "soft"
    | "danger"
    | "secondary";

    size?: "sm" | "md" | "lg";
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button = ({
    children,
    fullWidth = false,
    buttonIsLoading = false,
    variant = "solid",
    loadingText = 'Cargando...',
    size = "md",
    leftIcon,
    rightIcon,
    className = "",
    ...props
}: ButtonProps) => {

    const variantStyles: Record<string, string> = {
        solid: "buttonSolid",
        ghost: "buttonGhost",
        outline: "buttonOutline",
        soft: "buttonSoft",
        danger: "buttonDanger",
        secondary: "buttonSecondary",
    };

    const sizeStyles: Record<string, string> = {
        sm: "text-xs px-3 py-1.5 rounded-md",
        md: "text-sm px-5 py-2.5 rounded-lg",
        lg: "text-base px-6 py-3 rounded-xl"
    };

    return (
        <button
            disabled={buttonIsLoading || props.disabled}
            className={`
                baseButtonStyle
                flex items-center justify-center gap-2
                transition-all
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${fullWidth ? "w-full" : ""}
                ${buttonIsLoading ? "cursor-not-allowed opacity-80" : "cursor-pointer"}
                ${className}
            `}
            {...props}
        >
            {buttonIsLoading ? (
                <>
                    <LoaderSpinner size="w-5 h-5" />
                    {loadingText}
                </>
            ) : (
                <>
                    {leftIcon && <span className="flex items-center">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="flex items-center">{rightIcon}</span>}
                </>
            )}
        </button>
    )
}