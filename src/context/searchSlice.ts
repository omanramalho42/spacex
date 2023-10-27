import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    value: '', // Valor inicial do campo de pesquisa
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload; // Atualize o valor da pesquisa com o valor fornecido
    },
  },
});

export const { setSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
