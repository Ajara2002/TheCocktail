import React, { useEffect } from "react";
import s from "../Alfavit-info/Alfavit-info.module.css"
import { useParams, useNavigate } from "react-router-dom";
import { getAlfavitMeals } from "../../Redux-toolkit/MealSlice/MealSlice"
import { useDispatch, useSelector } from "react-redux";
import List from "../List";
import Alfavit from "../Alfavit";

const AlfavitInfo = () => {
    const { drinks } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAlfavitMeals(drinks))
    }, [drinks])
    const { alfavitInfo } = useSelector((state) => state.products)
    const infoClick = (id, title) => {
        navigate(`/drinks/${id}/${title}`)
    }
    console.log(alfavitInfo);

    return (
        <div className="container">
            <div className={s.content}>
                {
                    alfavitInfo ? (<List
                        items={alfavitInfo}
                        renderItem={(elem, i) => (
                            <div onClick={() => infoClick(elem.idDrink, elem.strDrink)} className={s.meal_content}>
                                <div className={s.images}>
                                    <img src={elem.strDrinkThumb} alt="" />
                                </div>
                                <p>{elem.strDrink}</p>
                            </div>
                        )}
                    />) : (
                        <h2 className={s.text}>No drinks</h2>
                    )
                }
            </div>
            <div>
                <h2 className={s.text}>Browse By Name</h2>
                <Alfavit />
            </div>
        </div>
    )
}

export default AlfavitInfo