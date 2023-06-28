import { Environment } from "../../../environment"
import { Api } from "../axios-config"

export interface IListagemPessoa {
    id: number;
    nomeCompleto: string;
    email: string;
    cidadeId: number;
}

export interface IDetalhesPessoa {
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

const getById = async (id: number):Promise<IDetalhesPessoa | Error> => {
    try {        
        const { data } = await Api.get(`/pessoas/${id}`)

        if(data) {
            return data;
        }
        return new Error('Erro ao consultar o registro.');

    } catch(error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
    }
}

const create = async (dados: Omit<IDetalhesPessoa, 'id'>):Promise<number | Error> => {
    try {        
        const { data } = await Api.post<IDetalhesPessoa>('/pessoas', dados)

        if(data) {
            return data.id;
        }
        return new Error('Erro ao criar o registro.');

    } catch(error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
    }
}

const updateById = async (id: number, dados: IDetalhesPessoa):Promise<void | Error> => {
    try {        
        await Api.put('/pessoas/${id}')
    } catch(error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
    }
}

const deleteById = async (id: number):Promise<void | Error> => {
    try {
        await Api.delete(`/pessoas/${id}`);
    } catch(error) {
        console.error(error);
        return new Error((error as { message: string}).message || 'Erro ao apagar registro');
    }
}

export const PessoasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}