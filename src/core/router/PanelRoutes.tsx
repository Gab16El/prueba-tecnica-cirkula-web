import { Navigate, Route, Routes } from 'react-router-dom'
import { StorePage } from '../features/stores/pages/StorePage'

export const PanelRoutes = () => {
    return (
        <section className="bg-white w-full min-h-screen flex flex-col">
            <main className="grow">
                <Routes>
                    <Route
                        path="/formulario"
                        element={<StorePage />}
                    />

                    <Route path="*" element={<Navigate to="/panel/formulario" replace />} />
                </Routes>
            </main>
        </section>
    )
}
