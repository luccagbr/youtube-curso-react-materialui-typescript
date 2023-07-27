import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { FerramentasDaListagem, FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { useEffect, useState } from "react";
import { PessoasService } from "../../shared/services/api/pessoas";
import { CidadesService } from "../../shared/services/api/cidades";

export const DashBoard = () => {
    const [ isLoadingPessoas, setIsLoadingPessoas ] = useState(false);
    const [ isLoadingCidades, setIsLoadingCidades ] = useState(false);
    const [ totalCountPessoas, setTotalCountPessoas ] = useState(0);
    const [ totalCountCidades, setTotalCountCidades ] = useState(0);

    useEffect(() => {
        setIsLoadingPessoas(true);
            PessoasService.getAll(1)
            .then((result) => {
                setIsLoadingPessoas(false);

                if(result instanceof Error) {
                    alert(result.message);
                    return;
                } else {
                    setTotalCountPessoas(result.totalCount)
                }
        })

        setIsLoadingCidades(true);
        CidadesService.getAll(1)
            .then((result) => {
                setIsLoadingCidades(false);

                if(result instanceof Error) {
                    alert(result.message);
                    return;
                } else {
                    setTotalCountCidades(result.totalCount)
                }
         })
    }, []);

    return (
        <LayoutBaseDePagina 
        titulo="Página Inicial"
        
        barraDeFerramentas={(
            <FerramentasDaListagem mostrarBotaoNovo={false}/>
        )}>
            <Box width="100%" display="flex">
                <Grid container margin={2}>
                    <Grid container item spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center">Total de cidades</Typography>
                               
                                    <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                                    {!isLoadingCidades && (
                                            <Typography variant="h1">
                                            {totalCountCidades}
                                        </Typography>
                                        )}

                                        {isLoadingCidades && (
                                            <Typography variant="h6">
                                                Carregando...
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>        
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center">Total de pessoas</Typography>

                                    <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                                        {!isLoadingPessoas && (
                                            <Typography variant="h1">
                                            {totalCountPessoas}
                                        </Typography>
                                        )}

                                        {isLoadingPessoas && (
                                            <Typography variant="h6">
                                                Carregando...
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>        
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </LayoutBaseDePagina>
    );
};