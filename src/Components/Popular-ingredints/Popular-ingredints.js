import React from "react";
import styles from "./Popular-ingredints.module.css"

const PopularIngredints = (props) => {
    const { strIngredient1, onClick } = props;
    return (
        <div onClick={onClick} className={styles.content_item}>
            <img src={`https://www.themealdb.com/images/ingredients/${strIngredient1}.png`} alt="" />
            <p>{strIngredient1}</p>
        </div>
    )
}

export default PopularIngredints