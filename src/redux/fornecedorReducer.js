import { createSlice } from "@reduxjs/toolkit";
import ESTADO from "./estados";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarFornecedor , excluirFornecedor , gravarFornecedor , alterarFornecedor } from "../services/servicoFornecedor";

export const buscarFornecedores = createAsyncThunk('buscarFornecedores', async ()=> {
    const resultado = await consultarFornecedor();
    try {
        if(Array.isArray(resultado)) {
            return{
                "status": true,
                "mensagem": "Fornecedores recuperados com sucesso",
                "listaDeFornecedores": resultado
            }
        } else {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar os fornecedores do backend",
                "listaDeFornecedores":[]
            }
        }
    } catch(erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
            "listaDeFornecedores": []
        }
    }
});

export const apagarFornecedor = createAsyncThunk('apagarFornecedor', async (fornecedor) => {
    const resultado = await excluirFornecedor(fornecedor);
    try{
        return {
            "status": resultado.status,
            "mensagem":resultado.mensagem,
            "cnpj":fornecedor.cnpj
        }
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        }
    }
});

export const incluirFornecedor = createAsyncThunk('incluirFornecedor', async (fornecedor) => {
    try {
        const resultado = await gravarFornecedor(fornecedor);
        if(resultado.status) {
            fornecedor.cnpj = resultado.cnpj;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "fornecedor":fornecedor
            }
        } else {
            return {
                "status":resultado.status,
                "mensagem":resultado.mensagem,
            }
        }
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        }
    }
});

export const atualizarFornecedor = createAsyncThunk('atualizarFornecedor', async (fornecedor) => {
    try{
        const resultado = await alterarFornecedor(fornecedor);
        if(resultado.status) { 
            fornecedor.cnpj = resultado.cnpj;
            return {
                "status":resultado.status,
                "mensagem":resultado.mensagem,
                "fornecedor":fornecedor
            }
        } else {
            return {
                "status":resultado.status,
                "mensagem":resultado.mensagem
            }
        }
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        }
    }
})

const fornecedorReducer = createSlice({
    name: "fornecedor",
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaDeFornecedores: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarFornecedores.pending, (state, action) => {
            state.estado=ESTADO.PENDENTE
            state.mensagem= "Processando requisição (buscando fornecedores)"
        })
        .addCase(buscarFornecedores.fulfilled, (state, action) => { 
                if(action.payload.status){
                    state.estado=ESTADO.OCIOSO
                    state.mensagem=action.payload.mensagem
                    state.listaDeFornecedores=action.payload.listaDeFornecedores
                }
                else{
                    state.estado=ESTADO.ERRO;
                    state.mensagem=action.payload.mensagem
                    state.listaDeFornecedores=action.payload.listaDeFornecedores
                }
            })
            .addCase(buscarFornecedores.rejected, (state, action) => {
                state.estado=ESTADO.ERRO
                state.mensagem=action.payload.mensagem
                state.listaDeFornecedores=action.payload.listaDeFornecedores
            })
            .addCase(apagarFornecedor.pending, (state, action)=>{
                state.estado = ESTADO.PENDENTE
                state.mensagem = "Processando requisição (excluindo o fornecedor do backend)"
            })
            .addCase(apagarFornecedor.fulfilled, (state,action)=>{
                state.mensagem= action.payload.mensagem
                if(action.payload.status){
                    state.estado=ESTADO.OCIOSO
                    state.listaDeFornecedores = state.listaDeFornecedores.filter((item)=> item.cnpj !== action.payload.cnpj)
                }else{
                    state.estado=ESTADO.ERRO
                }
            })
            .addCase(apagarFornecedor.rejected, (state,action)=>{
                state.estado=ESTADO.ERRO
                //state.mensagem=action.payload.mensagem
            })
            .addCase(incluirFornecedor.pending,(state,action)=>{
                state.estado=ESTADO.PENDENTE;
                state.mensagem="Processando a requisição (inclusão do fornecedor no backend)"
            })
            .addCase(incluirFornecedor.fulfilled,(state,action)=>{
                if(action.payload.status){
                    state.estado= ESTADO.OCIOSO;
                    state.mensagem= action.payload.mensagem;
                    state.listaDeFornecedores.push(action.payload.fornecedor)
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem= action.payload.mensagem;
                }
            })
            .addCase(incluirFornecedor.rejected,(state,action)=>{
                state.estado=ESTADO.ERRO;
                state.mensagem= action.payload.mensagem;

            })
            .addCase(atualizarFornecedor.pending,(state,action)=>{
                state.estado=ESTADO.PENDENTE;
                state.mensagem="Processando a requisição (Atualização do fornecedor no backend)"
            })
            .addCase(atualizarFornecedor.fulfilled,(state,action)=>{
                if(action.payload.status){
                    state.estado= ESTADO.OCIOSO;
                    state.mensagem= action.payload.mensagem;
                    state.listaDeFornecedores = state.listaDeFornecedores.map((item)=> item.cnpj === action.payload.fornecedor.cnpj ? action.payload.fornecedor : item)
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem= action.payload.mensagem;
                }
            })
            .addCase(atualizarFornecedor.rejected,(state,action)=>{
                state.estado=ESTADO.ERRO;
                state.mensagem= action.payload.mensagem;

            })
    }
})

export default fornecedorReducer.reducer;