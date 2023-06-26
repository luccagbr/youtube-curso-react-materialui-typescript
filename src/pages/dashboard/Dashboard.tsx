import { BarraDeFerramentas } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
export const DashBoard = () => {
    return (
        <LayoutBaseDePagina titulo="Pagina inicial" barraDeFerramentas={
            <BarraDeFerramentas mostrarInputBusca textoBotaoNovo="Novo"/>}>
        </LayoutBaseDePagina>
    );  
};