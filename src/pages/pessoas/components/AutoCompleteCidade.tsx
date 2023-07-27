import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { CidadesService } from "../../../shared/services/api/cidades";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../shared/hooks";
import { useField } from "@unform/core";

// interface IAutoCOmpleteCidadesProps {
// }

type TAutoCompleteOption = {
    id: number;
    label: string;
}

interface IAutoCompleteCidades {
    isExternalLoading?: boolean;
}

export const AutoCompleteCidades: React.FC<IAutoCompleteCidades> = ({ isExternalLoading = false }) => {
    const { 
        fieldName,
        registerField,
        defaultValue,
        error,
        clearError
    } = useField("cidadeId");
    
    const { debounce } = useDebounce();

    const [ selectedId, setSelectedId ] = useState<Number | undefined>(defaultValue);
    const [ opcoes, setOpcoes ] = useState<TAutoCompleteOption[]>([]);
    const [ loading, setLoading ] = useState(false);
    const [ busca, setBusca ] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newSelectedId) => setSelectedId(newSelectedId)
        })
    }, [registerField, fieldName, selectedId])

    useEffect(() => {
        setLoading(true);

        debounce(() => {
            CidadesService.getAll(1, busca)
            .then((result) => {
                setLoading(false);

                if(result instanceof Error) {
                    alert(result.message);
                    return;
                } else {
                    setOpcoes(result.data.map(cidade => ({ id: cidade.id, label: cidade.nome})
                    ))
                }
         })
        })
    }, [busca])

    const autoCompleteSelectedOption = useMemo(() => {
        if(selectedId === undefined) return null;

        const selectedOption = opcoes.find((opcao) => opcao.id === selectedId);

        if(!selectedOption) return null;

        return selectedOption;
    }, [selectedId, opcoes]);

    return (
        <Autocomplete
            openText="Abrir"
            closeText="Fechar"
            noOptionsText="Sem opções"
            loadingText="Carregando"
            disablePortal
            value={autoCompleteSelectedOption}
            disabled={isExternalLoading}
            loading={loading}
            popupIcon={isExternalLoading || loading ? <CircularProgress size={28}/> : undefined}
            onInputChange={(_, newValue) => setBusca(newValue)}
            options={opcoes}
            onChange={(_,newValue) => {setSelectedId(newValue?.id); setBusca(''); clearError()}}
            renderInput={(params) => {
                return <TextField 
                    {...params}
                    label="Cidade"
                    error={!!error}
                    helperText={error}
                />
            }}
        />
    )
}