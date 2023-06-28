import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../contexts';
import { useEffect } from 'react';
import { 
    DashBoard, ListagemDePessoas
 } from '../pages/';

export const AppRoutes = () => {
    const { setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                icon: 'home',
                path: '/pagina-inicial',
                label: 'Página Inicial',
            },

            {
                icon: 'people',
                path: '/pessoas',
                label: 'Pessoas',
            }
        ]);
    }, [])

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<DashBoard/>}/>
            <Route path="/pessoas" element={<ListagemDePessoas/>}/>
            {/* <Route path="/cidades/detalhe/:id" element={<DashBoard/>}/> */}

            {/* <Route path="*" element={<Navigate to="/pagina-inicial"/>}/> */}
        </Routes>
    );
}