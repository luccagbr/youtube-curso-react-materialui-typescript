import { Box, Grid } from "@mui/material";
import { FerramentasDaListagem, FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";

export const DashBoard = () => {
    return (
        <LayoutBaseDePagina 
        titulo="Página Inicial"
        barraDeFerramentas={(
            <FerramentasDaListagem />
        )}>
            <Box width="100%" display="flex">
                <Grid container>
                    <Grid container item>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                            
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </LayoutBaseDePagina>
    );
};