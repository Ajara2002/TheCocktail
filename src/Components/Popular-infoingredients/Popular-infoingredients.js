import React, { useEffect } from "react";
import styles from "./Popular-infoingredients.module.css"
import { useParams, useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPopularInfo } from "../../Redux-toolkit/MealSlice/MealSlice";
import List from "../List";

const PopularInfoIngredints = () => {
    const disaptch = useDispatch()
    const { title } = useParams()
    const navigate = useNavigate()
    const { popularInfo, text } = useSelector((state =>
        state.products))
    useEffect(() => {
        disaptch(getPopularInfo(title))
    }, [title])
    
    const handleInfo = (id, title) => {
        navigate(`/drinks/${id}/${title}`)
    }

    return (
        <div className="container">
            <div className={styles.content}>
                <div className={styles.title}>
                    <h2>{title}</h2>
                    <div className={styles.content_title}>
                        <img src={`https://www.thecocktaildb.com/images/ingredients/${title}.png`} alt="" />
                    </div>
                </div>
                <div className={styles.images_title}>
                    <h2>Drinks</h2>
                    <div className={styles.images}>
                    <List
                            items={popularInfo && popularInfo}
                            renderItem={(elem, i) => (
                                <div  key={i} onClick={() => handleInfo(elem.idDrink, elem.strDrink)}  className={styles.images_item}>
                                    <div className={styles.item}>
                                        <img src={elem.strDrinkThumb} alt="" />
                                    </div>
                                    <p>{elem.strDrink}</p>
                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.description}>
            <div>Description</div>
            <p>{text}</p>
            </div>
        </div>
    )
}

export default PopularInfoIngredints