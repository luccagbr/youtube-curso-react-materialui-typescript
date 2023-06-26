import { Box, Button, Divider, Icon, Paper, useTheme } from '@mui/material';

interface IFerramentasDeDetalhe {
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEFechar?: boolean;
    mostrarBotaoVoltar?: boolean;

    aoClicarEmSalvar?: () => void;
    aoClicarEmApagar?: () => void;
    aoClicarEmSalvarEFechar?: () => void;
    aoClicarEmNovo?: () => void;
    aoClicarEmVoltar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalhe> = ({
    textoBotaoNovo = "Novo",

    mostrarBotaoSalvar = true,
    mostrarBotaoNovo = true,
    mostrarBotaoSalvarEFechar = false,
    mostrarBotaoApagar = true,
    mostrarBotaoVoltar = true,

    aoClicarEmSalvar,
    aoClicarEmSalvarEFechar,
    aoClicarEmApagar,
    aoClicarEmNovo,
    aoClicarEmVoltar
}) => {
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
            {mostrarBotaoSalvar && (
                <Button
                variant="contained" 
                color="primary" 
                disableElevation 
                endIcon={<Icon>save</Icon>}
                onClick={aoClicarEmSalvar}
                >Salvar</Button>
            )}

            {mostrarBotaoSalvarEFechar && (
                <Button
                variant="outlined" 
                color="primary" 
                disableElevation 
                startIcon={<Icon>save</Icon>}
                onClick={aoClicarEmSalvarEFechar}
                >Salvar e voltar</Button>
            )}

            {mostrarBotaoApagar && (
                <Button
                variant="outlined" 
                color="primary" 
                disableElevation 
                startIcon={<Icon>delete</Icon>}
                onClick={aoClicarEmApagar}
                >Apagar</Button>
            )} 

            {mostrarBotaoNovo && (
                <Button
                variant="outlined" 
                color="primary" 
                disableElevation 
                startIcon={<Icon>add</Icon>}
                onClick={aoClicarEmNovo}
                >{textoBotaoNovo}</Button>
            )}

            <Divider variant="middle" orientation="vertical"/>

            {mostrarBotaoVoltar && (
                <Button
                variant="outlined" 
                color="primary" 
                disableElevation 
                startIcon={<Icon>arrow_back</Icon>}
                onClick={aoClicarEmVoltar}
                >Voltar</Button> 
            )}

        </Box>
    )
}