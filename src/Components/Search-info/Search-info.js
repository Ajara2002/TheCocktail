import React,{useEffect} from 'react'
import s from "./Search-info.module.css"
import { useParams,useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { getSearchMeals } from '../../Redux-toolkit/MealSlice/MealSlice'
import List from '../List'

const SerchInfo = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {text}=useParams()
    useEffect(()=>{
        dispatch(getSearchMeals(text))
    },[text])
    const {search}=useSelector((state)=>state.products)
    const handleInfo=(id, title)=>{
        navigate(`/drinks/${id}/${title}`)
    }
  return (
    <div className='container'>
        <div className={s.content}>
                {
                    search?(<List 
                        items={search}
                        renderItem={(elem,i)=>(
                            <div onClick={()=>handleInfo(elem.idDrink,elem.strDrink)} className={s.meal_content}>
                                <div className={s.images}>
                                    <img src={elem.strDrinkThumb} alt="" />
                                </div>
                                <p>{elem.strDrink}</p>
                            </div>
                        )}
                        />):(
                            <h2 className={s.text}>No Product</h2>
                        )
                }
        </div>
    </div>
  )
}

export default SerchInfo