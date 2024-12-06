import { createSlice } from "@reduxjs/toolkit";
import ESTADO from "./estados";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarCliente , excluirCliente , gravarCliente , alterarCliente } from "../services/servicoCliente";

export const buscarClientes = createAsyncThunk('buscarClientes', async ()=> {
    const resultado = await consultarCliente();
    try {
        if(Array.isArray(resultado)) {
            return{
                "status": true,
                "mensagem": "Clientes recuperados com sucesso",
                "listaDeClientes": resultado
            }
        } else {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar os clientes do backend",
                "listaDeClientes":[]
            }
        }
    } catch(erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
            "listaDeClientes": []
        }
    }
});

export const apagarCliente = createAsyncThunk('apagarCliente', async (cliente) => {
    const resultado = await excluirCliente(cliente);
    try{
        return {
            "status": resultado.status,
            "mensagem":resultado.mensagem,
            "cpf":cliente.cpf
        }
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        }
    }
});

export const incluirCliente = createAsyncThunk('incluirCliente', async (cliente) => {
    try {
        const resultado = await gravarCliente(cliente);
        if(resultado.status) {
            cliente.cpf = resultado.cpf;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "cliente":cliente
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

export const atualizarCliente = createAsyncThunk('atualizarCliente', async (cliente) => {
    try{
        const resultado = await alterarCliente(cliente);
        if(resultado.status) { 
            cliente.cpf = resultado.cpf;
            return {
                "status":resultado.status,
                "mensagem":resultado.mensagem,
                "cliente":cliente
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

const clienteReducer = createSlice({
    name: "cliente",
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaDeClientes: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarClientes.pending, (state, action) => {
            state.estado=ESTADO.PENDENTE
            state.mensagem= "Processando requisição (buscando clientes)"
        })
        .addCase(buscarClientes.fulfilled, (state, action) => { 
                if(action.payload.status){
                    state.estado=ESTADO.OCIOSO
                    state.mensagem=action.payload.mensagem
                    state.listaDeClientes=action.payload.listaDeClientes
                }
                else{
                    state.estado=ESTADO.ERRO;
                    state.mensagem=action.payload.mensagem
                    state.listaDeClientes=action.payload.listaDeClientes
                }
            })
            .addCase(buscarClientes.rejected, (state, action) => {
                state.estado=ESTADO.ERRO
                state.mensagem=action.payload.mensagem
                state.listaDeClientes=action.payload.listaDeClientes
            })
            .addCase(apagarCliente.pending, (state, action)=>{
                state.estado = ESTADO.PENDENTE
                state.mensagem = "Processando requisição (excluindo o cliente do backend)"
            })
            .addCase(apagarCliente.fulfilled, (state,action)=>{
                state.mensagem= action.payload.mensagem
                if(action.payload.status){
                    state.estado=ESTADO.OCIOSO
                    state.listaDeClientes = state.listaDeClientes.filter((item)=> item.cpf !== action.payload.cpf)
                }else{
                    state.estado=ESTADO.ERRO
                }
            })
            .addCase(apagarCliente.rejected, (state,action)=>{
                state.estado=ESTADO.ERRO
                //state.mensagem=action.payload.mensagem
            })
            .addCase(incluirCliente.pending,(state,action)=>{
                state.estado=ESTADO.PENDENTE;
                state.mensagem="Processando a requisição (inclusão do cliente no backend)"
            })
            .addCase(incluirCliente.fulfilled,(state,action)=>{
                if(action.payload.status){
                    state.estado= ESTADO.OCIOSO;
                    state.mensagem= action.payload.mensagem;
                    state.listaDeClientes.push(action.payload.cliente)
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem= action.payload.mensagem;
                }
            })
            .addCase(incluirCliente.rejected,(state,action)=>{
                state.estado=ESTADO.ERRO;
                state.mensagem= action.payload.mensagem;

            })
            .addCase(atualizarCliente.pending,(state,action)=>{
                state.estado=ESTADO.PENDENTE;
                state.mensagem="Processando a requisição (Atualização do cliente no backend)"
            })
            .addCase(atualizarCliente.fulfilled,(state,action)=>{
                if(action.payload.status){
                    state.estado= ESTADO.OCIOSO;
                    state.mensagem= action.payload.mensagem;
                    state.listaDeClientes = state.listaDeClientes.map((item)=> item.cpf === action.payload.cliente.cpf ? action.payload.cliente : item)
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem= action.payload.mensagem;
                }
            })
            .addCase(atualizarCliente.rejected,(state,action)=>{
                state.estado=ESTADO.ERRO;
                state.mensagem= action.payload.mensagem;

            })
    }
})

export default clienteReducer.reducer;