import { useNavigate, useParams } from "react-router-dom"
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useRef, useState } from "react";
import { PessoasService } from "../../shared/services/api/pessoas";
import { LinearProgress, Paper, TextField } from "@mui/material";
import { Form } from "@unform/web";
import { VTextField } from "../../shared/forms";
import { FormHandles } from "@unform/core";

interface IFormData {
    email: string;
    nomeCompleto: string;
    cidadeId: string;
}

export const DetalheDePessoa: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    const formRef = useRef<FormHandles>(null);

    useEffect(() => {
        if(id !== "nova") {
            setIsLoading(true);

            PessoasService.getById(Number(id))
             .then((result) => {
                setIsLoading(false);
                if(result instanceof Error) {
                    alert(result.message);
                    navigate("/pessoas");
                } else {
                    setNome(result.nomeCompleto)
                    console.log(result);
                }
             })
        }
    }, [id]);

    const handleSave = (dados: IFormData) => {
        console.log(dados);
    }

    const handleDelete = (id: number) => {
        if(confirm("Deseja relmente apagar o registro?")) {
            PessoasService.deleteById(id)
            .then((result => {
                if(result instanceof Error) {
                    alert(result.message);
                } else {
                    alert("Registro apagado com sucesso!");
                    navigate("/pessoas")
                }
            }))
        } 
    }

    return (
        <LayoutBaseDePagina
            titulo={id === "nova" ? "Nova pessoa" : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo="Nova"
                    mostrarBotaoSalvarEVoltar
                    mostrarBotaoNovo = {id !== "nova"}
                    mostrarBotaoApagar={id !== "nova"}

                    aoClicarEmSalvarEVoltar={() => {}}
                    aoClicarEmSalvar={() => formRef.current?.submitForm()}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
                    aoClicarEmVoltar={() => navigate("/pessoas")}

                />}
        >
            {isLoading && (
                <LinearProgress variant="indeterminate"/>
            )}

            
            <Form ref={formRef} onSubmit={(dados) => handleSave(dados)}>
                <VTextField name = "nomeCompleto"/>
                <VTextField name = "email"/>
                <VTextField name = "cidadeId"/>
            </Form>
        </LayoutBaseDePagina>
    )
}