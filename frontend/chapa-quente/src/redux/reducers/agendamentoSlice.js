import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchAgendamentos = createAsyncThunk('agendamento/fetchAgendamento', async () => {
    try {
        const response = await axios.get('http://localhost:4000/agendamento');
        return response.data;
    } catch (error) {
        console.error('Error fetching agendamento:', error);
        throw error;
    }
})

export const fetchAgendamento = createAsyncThunk('agendamento/fetchAgendamento', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:4000/agendamento${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue("Agendamento não existe na base")
    }
})

export const addAgendamento = createAsyncThunk('agendamento/fetchAgendamento', async (agendamentoData) => {
    try {
        const response = await axios.post('http://localhost:4000/agendamento', agandamentoData);
        return response.data;
    } catch (error) {
        console.error('Error adding agendamento:', error);
        throw error;
    }
});

export const removeAgendamento = createAsyncThunk('agendamento/fetchAgendamento', async (agendamentoId, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`http://localhost:4000/agendamento/${agendamentoId}`);
        return agendamentoId;
    } catch (error) {
        return rejectWithValue("Agendamento não existe na base");
    }
})

export const alteraAgendamento = createAsyncThunk('agendamento/fetchAgendamento', async (agendamentoData) => {
    try {
        const response = await axios.patch(`http://localhost:4000/agendamento/${agendamentoData.id}`, agendamentoData);
        return response.data;
    } catch (error) {
        console.error('Error altering agendamento:', error);
        throw error;
    }
})

const agendamentoAdapter = createEntityAdapter();

export const slice = createSlice({
    name: 'agendamento',
    initialState: agendamentoAdapter.getInitialState({
        status: 'idle',
        error: null,
    }),
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAgendamento.pending, (state, actions) => {
            console.log("agendamento pendente")
            state.status = 'loading'
        }).addCase(fetchAgendamento.fulfilled, (state, actions) => {
            console.log("agendamentos carregados")
            state.status = 'succeeded'
            agendamentoAdapter.setAll(state, actions.payload)
        }).addCase(addAgendamento.fulfilled, (state, actions) => {
            console.log("Adicionando agendamento")
            state.status = 'succeeded'
            agendamentoAdapter.addOne(state, actions.payload)
        }).addCase(fetchAgendamento.pending, (state, actions) => {
            console.log("agendamento pendente")
            state.status = 'loading'
        }).addCase(fetchAgendamento.fulfilled, (state, actions) => {
            console.log("agendamento pronto")
            state.status = 'succeeded'
            agendamentoAdapter.addOne(state, actions.payload);
        }).addCase(fetchAgendamento.rejected, (state, action) => {
            state.status = 'failed';
            throw action.payload;
        }).addCase(alteraAgendamento.pending, (state, actions) => {
            console.log("Altera agendamento pendente")
            state.status = 'loading'
        }).addCase(alteraAgendamento.fulfilled, (state, actions) => {
            console.log("Altera agendamento pronto")
            state.status = 'succeeded'
            agendamentoAdapter.upsertOne(state, actions.payload);
        }).addCase(removeAgendamento.pending, (state, actions) => {
            console.log("Removendo produto")
            state.status = 'loading'
        }).addCase(removeAgendamento.fulfilled, (state, actions) => {
            console.log("Produto removido")
            state.status = 'succeeded'
            agendamentoAdapter.removeOne(state, actions.payload)
        }).addCase(removeAgendamento.rejected, (state, action) => {
            console.log("Erro ao remover produto:", action.payload);
            state.status = 'failed';
            throw action.payload;
        })
    }
})

export const { } = slice.actions
export default slice.reducer

export const {
    selectAll: selectAllAgendamentos,
    selectById: selectAgendamento,
} = agendamentoAdapter.getSelectors(state => state.agendamentos)

//'idle' | 'loading' | 'succeeded' | 'failed' | 'changed' 