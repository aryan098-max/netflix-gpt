import { createSlice } from "@reduxjs/toolkit";


const gptSlice = createSlice({

    name:"gpt",
    initialState:{
        showGptSearch: false,
        gptSearchResults: null, 
        tmdbSearchResults: null
    }, 
    reducers:{
        toggleGPTSearchView:(state)=>{
            state.showGptSearch = !state.showGptSearch
        },

        addMovieResults:(state,action)=>{
            // destructuring payloads and assigning to state variables
            const {gptSearchResults, tmdbSearchResults} = action.payload
            state.gptSearchResults = gptSearchResults
            state.tmdbSearchResults = tmdbSearchResults
        }

    }
})

export const {toggleGPTSearchView, addMovieResults} = gptSlice.actions;

export default gptSlice.reducer;