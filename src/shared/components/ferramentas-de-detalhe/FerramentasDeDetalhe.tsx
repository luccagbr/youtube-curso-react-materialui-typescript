import { Box, Button, Divider, Icon, Paper, useTheme } from '@mui/material';

interface IFerramentasDeDetalhe {

}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalhe> = () => {
    const theme = useTheme();

    return (
        <Box 
            height={theme.spacing(5)} 
            marginX={1} 
            padding={1} 
            paddingX={2} 
            display="flex" 
            gap={1} 
            alignItems="center"
            component={Paper}
        >
            <Button
                variant="contained" 
                color="primary" 
                disableElevation 
                endIcon={<Icon>save</Icon>}
                onClick={() => {}}
                >Salvar</Button> 

            <Button
                variant="outlined" 
                color="primary" 
                disableElevation 
                startIcon={<Icon>save</Icon>}
                onClick={() => {}}
                >Salvar e voltar</Button> 

            <Button
                variant="outlined" 
                color="primary" 
                disableElevation 
                startIcon={<Icon>delete</Icon>}
                onClick={() => {}}
                >Apagar</Button> 

            <Button
                variant="outlined" 
                color="primary" 
                disableElevation 
                startIcon={<Icon>add</Icon>}
                onClick={() => {}}
                >Novo</Button>

            <Divider variant="middle" orientation="vertical"/>

            <Button
                variant="outlined" 
                color="primary" 
                disableElevation 
                startIcon={<Icon>arrow_back</Icon>}
                onClick={() => {}}
                >Voltar</Button> 
        </Box>
    )
}