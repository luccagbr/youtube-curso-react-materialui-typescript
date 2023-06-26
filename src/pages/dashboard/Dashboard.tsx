import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
export const DashBoard = () => {
    return (
        <LayoutBaseDePagina titulo="Pagina inicial" barraDeFerramentas={
            <FerramentasDaListagem mostrarInputBusca textoBotaoNovo="Novo"/>}>
        </LayoutBaseDePagina>
    );  
};