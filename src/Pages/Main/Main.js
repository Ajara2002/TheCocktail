import React, { useEffect } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from '../Home'
import {getLatestMeal,getPopular,getRandomMeal, getRondomingredints,  getRandomDrinks} from "../../Redux-toolkit/MealSlice/MealSlice"
import { useDispatch } from 'react-redux'
import InfoIngredients from "../../Components/info-ingredints"
import PopularInfoIngredints from "../../Components/Popular-infoingredients"
import AlfavitInfo from '../../Components/Alfavit-info'
import SerchInfo from '../../Components/Search-info'


const Main=()=> {
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getLatestMeal());
        dispatch(getPopular());
        dispatch(getRandomMeal());
        dispatch(getRondomingredints());
        dispatch(getRandomDrinks());
    },[])
    return (
        <div>
        {/* <Routes>
             <Route path='/' element={<Home/>} />
        </Routes> */}
         <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/drinks/:idDrink/:title' element={<InfoIngredients/>}/>
            <Route path='/ingredient/:title' element={<PopularInfoIngredints/>}/>
            <Route path='/alfavit/:drinks' element={<AlfavitInfo/>}/>
            <Route path="/search/:text" element={<SerchInfo />} />
         </Routes>
        </div>
    )
}
export default Main