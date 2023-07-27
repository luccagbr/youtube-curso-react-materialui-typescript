import { useNavigate, useParams } from "react-router-dom"
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useState } from "react";
import { PessoasService } from "../../shared/services/api/pessoas";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import * as yup from "yup";
import { AutoCompleteCidades } from "./components/AutoCompleteCidade";

interface IFormData {
    email: string;
    nomeCompleto: string;
    cidadeId: number;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    nomeCompleto: yup.string().min(3).required(),
    email: yup.string().max(255).email().required(),
    cidadeId: yup.number().required()
})

export const DetalheDePessoa: React.FC = () => {
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
        
        console.log(dados);

        formValidationSchema.
        validate(dados, { abortEarly: false })
        .then((dadosValidados) => {
            setIsLoading(true);

            if(id === "nova") {
                PessoasService
                .create(dadosValidados)
                .then((res) => {
                    setIsLoading(false);
                    
                    if(res instanceof Error) {
                        alert(res.message);
                    } else {
                        if(isSaveAndClose()) {
                            navigate('/pessoas');
                        } else {
                            navigate(`/pessoas/detalhe/${res}`)
                        }
                    }
                })
            } else {
                PessoasService
                .updateById(Number(id), {id: Number(id), ...dados})
                .then((res) => {
                    setIsLoading(false);
                    
                    if(res instanceof Error) {
                        alert(res.message);
                    } else {
                        if(isSaveAndClose()) {
                            navigate('/pessoas');
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
                    formRef.current?.setData(result);
                }
             })

        } else {
            formRef.current?.setData({
                nomeCompleto: "",
                email: "",
                cidadeId: undefined
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
                    aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
                    aoClicarEmVoltar={() => navigate("/pessoas")}

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
                                    label="Nome completo"
                                    name = "nomeCompleto"
                                    onChange={ e => setNome(e.target.value)}
                                />
                            </Grid>
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
                                    label="E-mail"
                                    name = "email"
                                    />
                            </Grid>
                        </Grid>

                        <Grid 
                            container 
                            item 
                            direction="row" 
                            spacing={2}
                        >
                            <Grid item xs={12} md={6} xl={2}>
                                <AutoCompleteCidades isExternalLoading={isLoading}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </VForm>
        </LayoutBaseDePagina>
    )
}