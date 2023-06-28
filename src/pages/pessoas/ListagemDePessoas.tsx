import { useSearchParams } from "react-router-dom"
import { FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { useEffect, useMemo, useState } from "react";
import { PessoasService, IListagemPessoa } from "../../shared/services/api/pessoas/PessoasService";
import { useDebounce } from "../../shared/hooks";
import { Box, Icon, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { MarginRounded } from "@mui/icons-material";

export const ListagemDePessoas: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();

    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const busca = useMemo(() => {
        return searchParams.get("busca") || ""
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            PessoasService.getAll(1, busca)
            .then((result) => {
                setIsLoading(false);

                if(result instanceof Error) {
                    alert(result.message);
                    return;
                } else {
                    setRows(result.data)
                    setTotalCount(result.totalCount)
                }
         })
        })
    }, [busca]);

    return (
        <LayoutBaseDePagina 
            titulo="Listagem de pessoas"
            barraDeFerramentas={<FerramentasDaListagem textoBotaoNovo="Nova" 
                mostrarInputBusca
                textoDaBusca={busca}
                aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto}, { replace: true })}/>
        }>

            <TableContainer component={Paper} variant="outlined" sx={{margin: 1, width: "auto"}}>
                <Table>
                   <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome completo</TableCell>
                            <TableCell>E-mail</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {!isLoading ? (
                            <></>
                        ) : (
                            <>
                                {rows.map((pessoa) => (
                                    <TableRow key={pessoa.id}>
                                        <TableCell></TableCell>
                                        <TableCell>{pessoa.nomeCompleto}</TableCell>
                                        <TableCell>{pessoa.email}</TableCell>
                                    </TableRow>
                        ))}
                            </>
                        )
                        }
                    </TableBody> 
                </Table>
            </TableContainer>
        </LayoutBaseDePagina>
    )
}