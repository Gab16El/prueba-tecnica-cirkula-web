import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
            errorInfo: null
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error capturado por Error Boundary:', error, errorInfo);
        this.setState({
            error,
            errorInfo
        });
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            const isDevelopment = import.meta.env.DEV;

            return (
                <div className="min-h-screen bg-linear-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
                    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-4">
                                <svg
                                    className="h-12 w-12 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>

                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                ¡Oops! Algo salió mal
                            </h2>

                            <p className="text-gray-600 mb-6">
                                Lo sentimos, ha ocurrido un error inesperado en la aplicación.
                                Por favor, intenta recargar la página o contacta con soporte si el problema persiste.
                            </p>

                            {isDevelopment && this.state.error && (
                                <div className="mb-6 text-left">
                                    <details className="bg-red-50 border border-red-200 rounded-lg p-4">
                                        <summary className="cursor-pointer font-semibold text-red-800 mb-2">
                                            Detalles del Error (Solo visible en desarrollo)
                                        </summary>
                                        <div className="mt-2 space-y-2">
                                            <div className="bg-white rounded p-3 border border-red-200">
                                                <p className="text-xs font-mono text-red-900 break-all">
                                                    <strong>Error:</strong> {this.state.error.toString()}
                                                </p>
                                            </div>
                                            {this.state.errorInfo && (
                                                <div className="bg-white rounded p-3 border border-red-200">
                                                    <p className="text-xs font-mono text-red-900 whitespace-pre-wrap break-all">
                                                        <strong>Stack:</strong>
                                                        {this.state.errorInfo.componentStack}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </details>
                                </div>
                            )}

                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={this.handleReset}
                                    className="px-6 py-3 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
                                >
                                    Volver al Inicio
                                </button>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all"
                                >
                                    Recargar Página
                                </button>
                            </div>

                            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-800">
                                    <strong>¿Necesitas ayuda?</strong> Contacta al equipo de soporte técnico o
                                    intenta nuevamente más tarde.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}