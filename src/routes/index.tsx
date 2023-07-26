import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../contexts';
import { useEffect } from 'react';
import { 
    DashBoard, 
    ListagemDePessoas,
    DetalheDePessoa,
    ListagemDeCidades,
    DetalheDeCidade
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
            },

            {
                icon: 'location_city',
                path: '/cidades',
                label: 'Cidades',
            }
        ]);
    }, [])

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<DashBoard/>}/>
            <Route path="/pessoas" element={<ListagemDePessoas/>}/>
            <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoa/>}/>
            <Route path="/cidades" element={<ListagemDeCidades/>}/>
            <Route path="/cidades/detalhe/:id" element={<DetalheDeCidade/>}/>
            <Route path="*" element={<Navigate to="/pagina-inicial"/>}/>
        </Routes>
    );
}