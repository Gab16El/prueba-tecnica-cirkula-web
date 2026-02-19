import { Navigate, Route, Routes } from 'react-router-dom';
import { PanelRoutes } from './PanelRoutes';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/panel/*' element={<PanelRoutes />} />
            <Route path='*' element={<Navigate to='/panel/formulario' />} />
        </Routes>
    )
}