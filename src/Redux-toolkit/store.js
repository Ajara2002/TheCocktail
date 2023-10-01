import {configureStore} from "@reduxjs/toolkit"
import MealSice from "./MealSlice/MealSlice"

const store=configureStore({
    reducer:{
        products:MealSice
    }
})

export default store