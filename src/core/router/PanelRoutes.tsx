import { Navigate, Route, Routes } from 'react-router-dom'
import { StorePage } from '../features/stores/pages/StorePage'
import { Navbar } from '../components/shared/Navbar'
import { Footer } from '../components/shared/Footer'

export const PanelRoutes = () => {
    return (
        <section className="bg-white w-full min-h-screen flex flex-col">
            <Navbar />
            <main className="grow">
                <Routes>
                    <Route
                        path="/formulario"
                        element={<StorePage />}
                    />

                    <Route path="*" element={<Navigate to="/panel/formulario" replace />} />
                </Routes>
            </main>
            <Footer />
        </section>
    )
}
