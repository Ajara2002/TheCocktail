import React from "react";
import styles from "./Meal-item.module.css"

const MealItem = (props) => {
const{strDrink,strDrinkThumb, onClick}=props
    return (
        <div onClick={onClick} className={styles.meal_content}>
            <div className={styles.meal_img}>
                <img src={strDrinkThumb} alt="" />
            </div>
            <p>{strDrink}</p>
        </div>

    )
}

export default MealItem