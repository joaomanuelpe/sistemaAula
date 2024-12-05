import { configureStore } from "@reduxjs/toolkit";
import produtoReducer from "./produtoReducer.js";
import categoriaReducer from "./categoriaReducer.js"
import fornecedorReducer from "./fornecedorReducer.js"

const store = configureStore({
    reducer:{
        "produto":produtoReducer,
        "categoria":categoriaReducer,
        "fornecedor":fornecedorReducer
    }
});

export default store;