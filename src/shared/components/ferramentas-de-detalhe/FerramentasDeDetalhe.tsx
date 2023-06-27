import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';

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
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

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
                >
                    <Typography variant="button" noWrap textOverflow="ellipsis" overflow="hidden">
                        Salvar
                    </Typography>   
                </Button>
            )}

            {mostrarBotaoSalvarCarregando && (
                <Skeleton width={120} height={60} />
            )}

            {(mostrarBotaoSalvarEVoltar && !mostrarBotaoSalvarEVoltarCarregando && !smDown && !mdDown) && (
                <Button
                variant="outlined" 
                color="primary" 
                disableElevation 
                startIcon={<Icon>save</Icon>}
                onClick={aoClicarEmSalvarEVoltar}
                >
                    <Typography variant="button" noWrap textOverflow="ellipsis" overflow="hidden">
                        Salvar e voltar
                    </Typography>            
                </Button>
            )}

            { (mostrarBotaoSalvarEVoltarCarregando && !smDown && !mdDown) && (
                <Skeleton width={180} height={60} />
            )}

            {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
                <Button
                variant="outlined" 
                color="primary" 
                disableElevation 
                startIcon={<Icon>delete</Icon>}
                onClick={aoClicarEmApagar}
                >
                    <Typography variant="button" noWrap textOverflow="ellipsis" overflow="hidden">
                        Apagar
                    </Typography>
                </Button>
            )} 

            {mostrarBotaoApagarCarregando && (
                <Skeleton width={110} height={60} />
            )}

            {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown) && (
                <Button
                variant="outlined" 
                color="primary" 
                disableElevation 
                startIcon={<Icon>add</Icon>}
                onClick={aoClicarEmNovo}
                >   
                    <Typography variant="button" noWrap textOverflow="ellipsis" overflow="hidden">
                        {textoBotaoNovo}
                    </Typography>
                </Button>
            )}

            {(mostrarBotaoNovoCarregando && !smDown) && (
                <Skeleton width={100} height={60} />

            )}

            {(mostrarBotaoVoltar && 
                (mostrarBotaoApagar || mostrarBotaoNovo || mostrarBotaoSalvar || mostrarBotaoSalvarEVoltar)) && (
                <Divider variant="middle" orientation="vertical"/>
            )}

            {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
                <Button
                variant="outlined" 
                color="primary" 
                disableElevation 
                startIcon={<Icon>arrow_back</Icon>}
                onClick={aoClicarEmVoltar}
                >
                   <Typography variant="button" noWrap textOverflow="ellipsis" overflow="hidden">
                       Voltar
                   </Typography>
                </Button> 
            )}

            {mostrarBotaoVoltarCarregando && (
                <Skeleton width={115} height={60} />
            )}

        </Box>
    )
}