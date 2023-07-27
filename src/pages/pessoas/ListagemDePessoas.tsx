import { useNavigate, useSearchParams } from "react-router-dom"
import { FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { useEffect, useMemo, useState } from "react";
import { PessoasService, IListagemPessoa } from "../../shared/services/api/pessoas/PessoasService";
import { useDebounce } from "../../shared/hooks";
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { Environment } from "../../shared/environment";

export const ListagemDePessoas: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();
    const navigate = useNavigate();

    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const busca = useMemo(() => {
        return searchParams.get("busca") || ""
    }, [searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get("pagina") || "1")
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            PessoasService.getAll(pagina, busca)
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
    }, [busca, pagina]);

    const handleDelete = (id: number) => {
        if(confirm("Deseja relmente apagar o registro?")) {
            PessoasService.deleteById(id)
            .then((result => {
                if(result instanceof Error) {
                    alert(result.message);
                } else {
                    setRows((oldRows) => [...oldRows.filter((oldRow) => oldRow.id !== id)]);
                    alert("Registro apagado com sucesso!");
                }
            }))
        } 
    }
    
    return (
        <LayoutBaseDePagina 
            titulo="Listagem de Pessoas"
            barraDeFerramentas={<FerramentasDaListagem textoBotaoNovo="Nova" 
                mostrarInputBusca
                textoDaBusca={busca}
                aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1'}, { replace: true })}/>
        }>

            <TableContainer component={Paper} variant="outlined" sx={{margin: 1, width: "auto"}}>
                <Table>
                   <TableHead>
                        <TableRow>
                            <TableCell width={100}>Ações</TableCell>
                            <TableCell>Nome completo</TableCell>
                            <TableCell>E-mail</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((pessoa) => (
                            <TableRow key={pessoa.id}>
                                <TableCell>
                                    <IconButton size="small" onClick={() => handleDelete(pessoa.id)}>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                    <IconButton size="small" onClick={() => navigate(`/pessoas/detalhe/${pessoa.id}`)}>
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </TableCell>
                                <TableCell>{pessoa.nomeCompleto}</TableCell>
                                <TableCell>{pessoa.email}</TableCell>
                            </TableRow>
                    ))}
                    </TableBody>

                    {totalCount === 0 && !isLoading && (
                        <caption>{Environment.LISTAGEM_VAZIA}</caption>
                    )}

                    {isLoading && (
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}><LinearProgress variant="indeterminate"/></TableCell>
                        </TableRow>
                    </TableFooter>
                    )}

                    {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Pagination
                                        page={pagina}
                                        count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                                        onChange={(e, newPage) => setSearchParams({ busca, pagina: newPage.toString()}, { replace: true })}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    )}
                </Table>
            </TableContainer>
        </LayoutBaseDePagina>
    )
}