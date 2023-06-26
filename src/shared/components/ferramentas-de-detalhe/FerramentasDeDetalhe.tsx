import { Box, Button, Divider, Icon, Paper, Skeleton, useTheme } from '@mui/material';

interface IFerramentasDeDetalhe {
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEVoltar?: boolean;
    mostrarBotaoVoltar?: boolean;

    mostrarBotaoNovoCarregando?: boolean;
    mostrarBotaoApagarCarregando?: boolean;
    mostrarBotaoSalvarCarregando?: boolean;
    mostrarBotaoSalvarEVoltarCarregando?: boolean;
    mostrarBotaoVoltarCarregando?: boolean;

    aoClicarEmSalvar?: () => void;
    aoClicarEmApagar?: () => void;
    aoClicarEmSalvarEVoltar?: () => void;
    aoClicarEmNovo?: () => void;
    aoClicarEmVoltar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalhe> = ({
    textoBotaoNovo = "Novo",

    mostrarBotaoSalvar = true,
    mostrarBotaoNovo = true,
    mostrarBotaoSalvarEVoltar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoVoltar = true,

    mostrarBotaoNovoCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarEVoltarCarregando = false,
    mostrarBotaoVoltarCarregando = false,

    aoClicarEmSalvar,
    aoClicarEmSalvarEVoltar,
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
            
            {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
                <Button
                variant="contained" 
                color="primary" 
                disableElevation 
                endIcon={<Icon>save</Icon>}
                onClick={aoClicarEmSalvar}
                >Salvar</Button>
            )}

            {mostrarBotaoSalvarCarregando && (
                <Skeleton width={120} height={60} />
            )}

            {(mostrarBotaoSalvarEVoltar && !mostrarBotaoSalvarEVoltarCarregando) && (
                <Button
                variant="outlined" 
                color="primary" 
                disableElevation 
                startIcon={<Icon>save</Icon>}
                onClick={aoClicarEmSalvarEVoltar}
                >Salvar e voltar</Button>
            )}

            { mostrarBotaoSalvarEVoltarCarregando && (
                <Skeleton width={180} height={60} />
            )}

            {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
                <Button
                variant="outlined" 
                color="primary" 
                disableElevation 
                startIcon={<Icon>delete</Icon>}
                onClick={aoClicarEmApagar}
                >Apagar</Button>
            )} 

            {mostrarBotaoApagarCarregando && (
                <Skeleton width={110} height={60} />
            )}

            {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando) && (
                <Button
                variant="outlined" 
                color="primary" 
                disableElevation 
                startIcon={<Icon>add</Icon>}
                onClick={aoClicarEmNovo}
                >{textoBotaoNovo}</Button>
            )}

            {mostrarBotaoNovoCarregando && (
                <Skeleton width={100} height={60} />

            )}

            <Divider variant="middle" orientation="vertical"/>

            {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
                <Button
                variant="outlined" 
                color="primary" 
                disableElevation 
                startIcon={<Icon>arrow_back</Icon>}
                onClick={aoClicarEmVoltar}
                >Voltar</Button> 
            )}

            {mostrarBotaoVoltarCarregando && (
                <Skeleton width={115} height={60} />
            )}

        </Box>
    )
}