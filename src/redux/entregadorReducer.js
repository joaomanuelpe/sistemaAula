import { createSlice } from "@reduxjs/toolkit";
import ESTADO from "./estados";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarEntregador , excluirEntregador , gravarEntregador , alterarEntregador } from "../services/servicoEntregador";

export const buscarEntregadores = createAsyncThunk('buscarEntregadores', async () => {
    const resultado = await consultarEntregador();
    try {

        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Entregadores recuperados com sucesso",
                "listaDeEntregadores":resultado
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os entregadores do backend",
                "listaDeEntregadores": []
            }
        }
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
            "listaDeEntregadores": []
        }

    }
});

export const apagarEntregador = createAsyncThunk('apagarEntregador', async (entregador)=>{
    //dar previsibilidade  ao conteudo do payload
    const resultado = await excluirEntregador(entregador);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "id":entregador.id
        }
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro :" + erro.message,
        }
    }
});

export const incluirEntregador = createAsyncThunk('incluirEntregador', async (entregador) =>{
    try{
        const resultado = await gravarEntregador(entregador);
        if(resultado.status){
            entregador.id = resultado.id;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "entregador":entregador
            }
        }
        else{
             return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
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
export const atualizarEntregador = createAsyncThunk('atualizarEntregador', async (entregador) =>{
    try{

        const resultado = await alterarEntregador(entregador);
        if(resultado.status){
            entregador.id = resultado.id;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "entregador":entregador
            }
        }
        else{
             return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
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

const entregadorReducer = createSlice({
    name: "entregador",
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaDeEntregadores: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarEntregadores.pending, (state, action) => {
            state.estado=ESTADO.PENDENTE
            state.mensagem= "Processando requisição (buscando entregadores)"
        })
        .addCase(buscarEntregadores.fulfilled, (state, action) => { 
                if(action.payload.status){
                    state.estado=ESTADO.OCIOSO
                    state.mensagem=action.payload.mensagem
                    state.listaDeEntregadores=action.payload.listaDeEntregadores
                }
                else{
                    state.estado=ESTADO.ERRO;
                    state.mensagem=action.payload.mensagem
                    state.listaDeEntregadores=action.payload.listaDeEntregadores
                }
            })
            .addCase(buscarEntregadores.rejected, (state, action) => {
                state.estado=ESTADO.ERRO
                state.mensagem=action.payload.mensagem
                state.listaDeEntregadores=action.payload.listaDeEntregadores
            })
            .addCase(apagarEntregador.pending, (state, action)=>{
                state.estado = ESTADO.PENDENTE
                state.mensagem = "Processando requisição (excluiindo o entregador do backend)"
            })
            .addCase(apagarEntregador.fulfilled, (state,action)=>{
                state.mensagem= action.payload.mensagem
                if(action.payload.status){
                    
                    state.estado=ESTADO.OCIOSO
                    state.listaDeEntregadores = state.listaDeEntregadores.filter((item)=> item.id !== action.payload.id)
                }else{
                    state.estado=ESTADO.ERRO
                }
            })
            .addCase(apagarEntregador.rejected, (state,action)=>{
                state.estado=ESTADO.ERRO
                //state.mensagem=action.payload.mensagem
            })
            .addCase(incluirEntregador.pending,(state,action)=>{
                state.estado=ESTADO.PENDENTE;
                state.mensagem="Processando a requisição (inclusão do entregador no backend)"
            })
            .addCase(incluirEntregador.fulfilled,(state,action)=>{
                if(action.payload.status){
                    state.estado= ESTADO.OCIOSO;
                    state.mensagem= action.payload.mensagem;
                    state.listaDeEntregadores.push(action.payload.entregador)
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem= action.payload.mensagem;
                }
            })
            .addCase(incluirEntregador.rejected,(state,action)=>{
                state.estado=ESTADO.ERRO;
                state.mensagem= action.payload.mensagem;

            })
            .addCase(atualizarEntregador.pending,(state,action)=>{
                state.estado=ESTADO.PENDENTE;
                state.mensagem="Processando a requisição (Atualização do entregador no backend)"
            })
            .addCase(atualizarEntregador.fulfilled,(state,action)=>{
                if(action.payload.status){
                    state.estado= ESTADO.OCIOSO;
                    state.mensagem= action.payload.mensagem;
                    state.listaDeEntregadores = state.listaDeEntregadores.map((item)=> item.id === action.payload.entregador.id ? action.payload.entregador : item)
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem= action.payload.mensagem;
                }
            })
            .addCase(atualizarEntregador.rejected,(state,action)=>{
                state.estado=ESTADO.ERRO;
                state.mensagem= action.payload.mensagem;

            })
    }
})

export default entregadorReducer.reducer;