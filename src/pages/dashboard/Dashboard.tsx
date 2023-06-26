import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
export const DashBoard = () => {
    return (
        <LayoutBaseDePagina 
        titulo="Página Inicial"
        barraDeFerramentas={(
            <FerramentasDeDetalhe />
        )}> Testando </LayoutBaseDePagina>
    );  
};