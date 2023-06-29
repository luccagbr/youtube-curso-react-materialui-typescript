import { useNavigate, useParams } from "react-router-dom"
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";

export const DetalheDePessoa: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const handleSave = () => {
        console.log("Salvo");
    }

    const handleDelete = () => {
        console.log("Deletado");
    }

    return (
        <LayoutBaseDePagina
            titulo="Detalhe de pessoa"
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo="Nova"
                    mostrarBotaoSalvarEVoltar
                    mostrarBotaoNovo = {id !== "nova"}
                    mostrarBotaoApagar={id !== "nova"}

                    aoClicarEmSalvarEVoltar={handleSave}
                    aoClicarEmSalvar={handleSave}
                    aoClicarEmApagar={handleDelete}
                    aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
                    aoClicarEmVoltar={() => navigate("/pessoas")}

                />}
        >
            <p>Detalhe de pessoa</p>
        </LayoutBaseDePagina>
    )
}