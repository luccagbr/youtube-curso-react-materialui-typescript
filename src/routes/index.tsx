import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../contexts';
import { useEffect } from 'react';
import { DashBoard } from '../pages/dashboard/Dashboard';

export const AppRoutes = () => {
    const { setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                icon: 'home',
                path: '/pagina-inicial',
                label: 'Página Inicial',
            },
        ]);
    }, [])

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<DashBoard/>}/>
            {/* <Route path="*" element={<Navigate to="/pagina-inicial"/>}/> */}
        </Routes>
    );
}