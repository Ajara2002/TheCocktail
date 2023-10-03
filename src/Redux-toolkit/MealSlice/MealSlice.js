import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import instance from "../../Http/Settings"
import Alfavit from "../../Components/Alfavit/Alfavit"
import AlfavitInfo from "../../Components/Alfavit-info/Alfavit-info"

const initialState={
    latest:[],
    infoDrink:[],
    popular: [],
    popularInfo: [],
    text: "",
    rondomMeal:[],
    rondomingredints:[],
    rondomDri:[],
    alfavitMeal:[],
    search: []
}
export const getLatestMeal=createAsyncThunk("latest/getLatestMeal",async(_,{rejectWithValue,dispatch})=>{
 

    try {
        const mealNumbers=[
          11007,11006,11005,11004,11003,11002,11001,11000
        ]
        const results=await Promise.all(
            mealNumbers.map(async(number)=>{
                const result=await instance.get(`lookup.php?i=${number}`)
                return result.data.drinks
            })
        )
        const combinedMeals=results.flat()
        dispatch(latestMeal(combinedMeals))
    } catch (error) {
        rejectWithValue(error.message) 
    }
})
export const getInfoDrink=createAsyncThunk("infoDrink/getInfoDrink",async(elem,{rejectWithValue,dispatch})=>{
    const result=await instance.get(`lookup.php?i=${elem}`)
    dispatch(ingoIngredientMeal(result.data.drinks))
  })
  export const getPopular = createAsyncThunk("popular/getPoular", async (_, { rejectWithValue, dispatch }) => {
    const result = await instance.get("list.php?i=list")
    dispatch(popularMeal(result.data.drinks))
    dispatch(getRondomingredints(result.data.drinks))
})
//?filter.php?i=
export const getPopularInfo = createAsyncThunk("popularInfo/getPopularInfo", async (elem, { rejectWithValue, dispatch }) => {
    const response = await instance.get(`filter.php?i=${elem}`)
    dispatch(popularInfoMeal(response.data.drinks))
});
export const getRandomMeal = createAsyncThunk("rondomMeal/getRandomMeal", async (_, { rejectWithValue, dispatch }) => {
    try {
        const rondom= [1,2,3,4,5,6,7,8]
        const responses = await Promise.all(
        rondom.map(()=>instance.get("random.php"))
        )
        const randomMealsData=responses.map(
            (response)=>response.data.drinks[0]
        )
        dispatch(getRandom(randomMealsData))
    } catch (error) {
       console.error("Error fetching random Drinks:", error)
    }
});
export const getRondomDri = createAsyncThunk("rondomDri/getRondomDri", async (_, { rejectWithValue, dispatch }) => {
    try {
        const rondom= [1,2,3,4,5,6,7,8]
        const responses = await Promise.all(
        rondom.map(()=>instance.get("random.php"))
        )
        const rondomDri=responses.map(
            (response)=>response.data.drinks[0]
        )
        dispatch(getRandom(rondomDri))
        console.log ("responses 1>>>",  rondomDri)
    } catch (error) {
       console.error("Error fetching random Drinks:", error)
    }
});

export const getAlfavitMeals = createAsyncThunk("alfavitMeal/getAlfavitMeals", async (elem, { rejectWithValue, dispatch }) => {
    const res = await instance.get(`search.php?f=${elem}`)
    dispatch(getAlfavitMeal(res.data.drinks))
});

export const getSearchMeals = createAsyncThunk(
    "search/getSearchMeals",
    async (elem, { rejectWithValue,dispatch }) => {
      const res=await instance.get(`search.php?s=${elem}`)
      dispatch(getSearchMeal(res.data.drinks))
    }
  );

const melSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
        latestMeal:(state,action)=>{
            state.latest=action.payload
        },
        ingoIngredientMeal:(state,action)=>{
            state.infoDrink=action.payload
        },
        popularMeal: (state, action) => {
            state.popular = action.payload
        },
        popularInfoMeal: (state, action) => {
            state.popularInfo = action.payload
        },
        onDescription: (state, action) => {
            state.text = action.payload
        },
        getRandom: (state, action) => {
            state.rondomMeal = action.payload
        },
        getRondomingredints: (state, action) => {
            state.rondomingredints = action.payload
        },
        getRondomDri:(state, action) => {
            state.rondomDri = action.payload
        },
        getAlfavitMeal: (state, action) => {
            state.alfavitInfo = action.payload
        },
        getSearchMeal:(state,action)=>{
            state.search=action.payload
          }
    }
})
export const {latestMeal,
    ingoIngredientMeal,
    popularMeal,
    popularInfoMeal,
    onDescription,
    getRandom, 
    getRondomingredints,
    rondomDri,
    getAlfavitMeal,
    getSearchMeal
     }=melSlice.actions

export default melSlice.reducer;