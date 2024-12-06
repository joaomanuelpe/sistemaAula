import { createSlice } from "@reduxjs/toolkit";
import ESTADO from "./estados.js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarTipo, excluirTipo, gravarTipo, alterarTipo } from "../services/servicoTipo";



export const buscarTipos = createAsyncThunk('buscarTipos', async () => {
    const resultado = await consultarTipo();
    try {

        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Tipos recuperados com sucesso",
                "listaDeTipos": resultado
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os tipos do backend",
                "listaDeTipos": []
            }
        }
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
            "listaDeTipos": []
        }

    }
});

export const apagarTipo = createAsyncThunk('apagarTipo', async (tipo) => {
    //dar previsibilidade  ao conteudo do payload
    const resultado = await excluirTipo(tipo);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "codigo": tipo.codigo
        }
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro :" + erro.message,
        }
    }
});

export const atualizarTipo = createAsyncThunk('atualizarTipo', async (tipo) =>{
    try{

        const resultado = await alterarTipo(tipo);
        if(resultado.status){
            tipo.codigo = resultado.codigo;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                //"codigo":Tipo.codigo
                "tipo":tipo
            }
        }
        else{
             return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                //"codigo":Tipo.codigo
            }
        }
    }
    catch(erro){
        return{
            "status": false,
           "mensagem": "Erro :" + erro.message,
        }
    }

})

export const incluirTipo = createAsyncThunk('incluirTipo', async (tipo) => {
    try {

        const resultado = await gravarTipo(tipo);
        if (resultado.status) {
            tipo.codigo = resultado.codigo;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                //"codigo":Tipo.codigo
                "tipo": tipo
            }
        }
        else {
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                //"codigo":tipo.codigo
            }
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro :" + erro.message,
        }
    }

})

const tipoReducer = createSlice({
    name: "tipo",
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaDeTipos: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarTipos.pending, (state, action) => {
            state.estado=ESTADO.PENDENTE
            state.mensagem= "Processando requisição (buscando Tipos)"
        })
        .addCase(buscarTipos.fulfilled, (state, action) => { 
                if(action.payload.status){
                    state.estado=ESTADO.OCIOSO
                    state.mensagem=action.payload.mensagem
                    state.listaDeTipos=action.payload.listaDeTipos
                }
                else{
                    state.estado=ESTADO.ERRO;
                    state.mensagem=action.payload.mensagem
                    state.listaDeTipos=action.payload.listaDeTipos
                }
            })
            .addCase(buscarTipos.rejected, (state, action) => {
                state.estado=ESTADO.ERRO
                state.mensagem=action.payload.mensagem
                state.listaDeTipos=action.payload.listaDeTipos
            })
            .addCase(apagarTipo.pending, (state, action)=>{
                state.estado = ESTADO.PENDENTE
                state.mensagem = "Processando requisição (excluiindo o Tipo do backend)"
            })
            .addCase(apagarTipo.fulfilled, (state,action)=>{
                state.mensagem= action.payload.mensagem
                if(action.payload.status){
                    
                    state.estado=ESTADO.OCIOSO
                    state.listaDeTipos = state.listaDeTipos.filter((item)=> item.codigo !== action.payload.codigo)
                }else{
                    state.estado=ESTADO.ERRO
                }
                //altera a lista de Tipo??
            })
            .addCase(apagarTipo.rejected, (state,action)=>{
                state.estado=ESTADO.ERRO
                //state.mensagem=action.payload.mensagem
            })
            .addCase(incluirTipo.pending,(state,action)=>{
                state.estado=ESTADO.PENDENTE;
                state.mensagem="Processando a requisição (inclusão do Tipo no backend)"
            })
            .addCase(incluirTipo.fulfilled,(state,action)=>{
                if(action.payload.status){
                    state.estado= ESTADO.OCIOSO;
                    state.mensagem= action.payload.mensagem;
                    state.listaDeTipos.push(action.payload.tipo)
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem= action.payload.mensagem;
                }
            })
            .addCase(incluirTipo.rejected,(state,action)=>{
                state.estado=ESTADO.ERRO;
                state.mensagem= action.payload.mensagem;

            })
            .addCase(atualizarTipo.pending,(state,action)=>{
                state.estado=ESTADO.PENDENTE;
                state.mensagem="Processando a requisição (Atualização do Tipo no backend)"
            })
            .addCase(atualizarTipo.fulfilled,(state,action)=>{
                if(action.payload.status){
                    state.estado= ESTADO.OCIOSO;
                    state.mensagem= action.payload.mensagem;
                    state.listaDeTipos = state.listaDeTipos.map((item)=> item.codigo === action.payload.tipo.codigo ? action.payload.tipo : item)
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem= action.payload.mensagem;
                }
            })
            .addCase(atualizarTipo.rejected,(state,action)=>{
                state.estado=ESTADO.ERRO;
                state.mensagem= action.payload.mensagem;

            })
    }
})

export default tipoReducer.reducer;