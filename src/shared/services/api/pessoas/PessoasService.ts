import { Environment } from "../../../environment"
import { Api } from "../axios-config"

// interface IPessoa {
    
// }

interface IListagemPessoa {
    id: number;
    nomeCompleto: string;
    email: string;
    cidadeId: number;
}

interface IDetalhesPessoa {
    id: number;
    nomeCompleto: string;
    email: string;
    cidadeId: number;
}

type TPessoasComTotalCount = {
    data: IListagemPessoa[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''):Promise<TPessoasComTotalCount | Error> => {
    try {

        const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`
        
        const { data, headers } = await Api.get(urlRelativa)

        if(data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            }
        }
        return new Error('Erro ao listar os registros.');

    } catch(error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
    }
}

const getById = async ():Promise<any> => {
    try {

    } catch(error) {
        
    }
}

const create = async ():Promise<any> => {
    try {

    } catch(error) {
        
    }
}

const updateById = async ():Promise<any> => {
    try {

    } catch(error) {
        
    }
}

const deleteById = async ():Promise<any> => {
    try {

    } catch(error) {
        
    }
}

export const PessoasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}