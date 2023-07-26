import { useNavigate, useParams } from "react-router-dom"
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useState } from "react";
import { CidadesService } from "../../shared/services/api/cidades";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import * as yup from "yup";

interface IFormData {
    nome: string;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    nome: yup.string().min(3).required(),
})

export const DetalheDeCidade: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    const { 
        formRef,
        save,
        saveAndClose,
        saveAndNew,
        isSaveAndClose,
        isSaveAndNew
    } = useVForm();

    
    const handleSave = (dados: IFormData) => {
        
        formValidationSchema.
        validate(dados, { abortEarly: false })
        .then((dadosValidados) => {
            setIsLoading(true);

        if(id === "nova") {
            CidadesService
            .create(dadosValidados)
            .then((res) => {
                setIsLoading(false);
                
                if(res instanceof Error) {
                    alert(res.message);
                } else {
                    if(isSaveAndClose()) {
                        navigate('/cidades');
                    } else {
                        navigate(`/cidades/detalhe/${res}`)
                    }
                }
            })
        } else {
            CidadesService
            .updateById(Number(id), {id: Number(id), ...dados})
            .then((res) => {
                setIsLoading(false);
                
                if(res instanceof Error) {
                    alert(res.message);
                } else {
                    if(isSaveAndClose()) {
                        navigate('/cidades');
                    }
                }
            })
        }
        })
        .catch((errors: yup.ValidationError) => {
            const validationErrors: IVFormErrors = {};

            errors.inner.forEach((error) => {
                if(!error.path) return;

                validationErrors[error.path] = error.message;
            });

            formRef.current?.setErrors(validationErrors)
        })
    }
    
    const handleDelete = (id: number) => {
        if(confirm("Deseja relmente apagar o registro?")) {
            CidadesService.deleteById(id)
            .then((result => {
                if(result instanceof Error) {
                    alert(result.message);
                } else {
                    alert("Registro apagado com sucesso!");
                    navigate("/cidades")
                }
            }))
        } 
    }
    
    useEffect(() => {
        if(id !== "nova") {
            setIsLoading(true);

            CidadesService.getById(Number(id))
             .then((result) => {
                setIsLoading(false);
                if(result instanceof Error) {
                    alert(result.message);
                    navigate("/cidades");
                } else {
                    setNome(result.nome)
                    formRef.current?.setData(result);
                }
             })

        } else {
            formRef.current?.setData({
                nome: "",
            });
        }
    }, [id]);

    return (
        <LayoutBaseDePagina
            titulo={id === "nova" ? "Nova pessoa" : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo="Nova"
                    mostrarBotaoSalvarEVoltar
                    mostrarBotaoNovo = {id !== "nova"}
                    mostrarBotaoApagar={id !== "nova"}

                    aoClicarEmSalvarEVoltar={saveAndClose}
                    aoClicarEmSalvar={save}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => navigate("/cidades/detalhe/nova")}
                    aoClicarEmVoltar={() => navigate("/cidades")}

                />}
        >   
            <VForm ref={formRef} onSubmit={handleSave}>
                <Box 
                    margin={1} 
                    display="flex" 
                    flexDirection="column" 
                    component={Paper}
                    variant="outlined"
                >
                    <Grid 
                        container 
                        direction="column" 
                        padding={2} 
                        spacing={2}
                    >
                        
                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant="indeterminate"/>
                            </Grid>
                        )}

                        <Grid item>
                            <Typography variant="h6">Geral</Typography>
                        </Grid>

                        <Grid 
                            container 
                            item 
                            direction="row" 
                            spacing={2}
                        >
                            <Grid item xs={12} sm={12} md={6} xl={2}>
                                <VTextField
                                    fullWidth 
                                    label="Nome da cidade"
                                    name = "nome"
                                    onChange={ e => setNome(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </VForm>
        </LayoutBaseDePagina>
    )
}