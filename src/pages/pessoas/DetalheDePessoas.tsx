import { useNavigate, useParams } from "react-router-dom"
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useRef, useState } from "react";
import { PessoasService } from "../../shared/services/api/pessoas";
import { Box, Grid, LinearProgress, Paper, TextField, Typography } from "@mui/material";
import { Form } from "@unform/web";
import { VTextField, VForm, useVForm } from "../../shared/forms";
import { FormHandles } from "@unform/core";

interface IFormData {
    email: string;
    nomeCompleto: string;
    cidadeId: number;
}

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
        
        setIsLoading(true);
        
        if(id === "nova") {
            PessoasService
            .create(dados)
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
                cidadeId: ""
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
                            <Grid item xs={12} sm={12} md={6} xl={2}>
                                <VTextField
                                    fullWidth 
                                    label="Cidade id"
                                    name = "cidadeId"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </VForm>
        </LayoutBaseDePagina>
    )
}