import { configureStore } from "@reduxjs/toolkit";
import produtoReducer from "./produtoReducer.js";
import categoriaReducer from "./categoriaReducer.js";
import fornecedorReducer from "./fornecedorReducer.js";
import clienteReducer from "./clienteReducer.js";
import entregadorReducer from "./entregadorReducer.js";
import tipoReducer from "./tipoReducer.js";
import usuarioReducer from "./usuarioReducer.js"

const store = configureStore({
    reducer:{
        "produto":produtoReducer,
        "categoria":categoriaReducer,
        "fornecedor":fornecedorReducer,
        "cliente":clienteReducer,
        "entregador":entregadorReducer,
        "tipo":tipoReducer,
        "usuario":usuarioReducer
    }
});

export default store;