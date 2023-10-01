import React from 'react'
import styles from "./Home.module.css"
import MealItem from '../../Components/Meal-item'
import List from '../../Components/List/List'
import {useSelector,useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom'
import PopularIngredints from "../../Components/Popular-ingredints/Popular-ingredints"
import { onDescription } from "../../Redux-toolkit/MealSlice/MealSlice"


const Home = () => {
    const navigete=useNavigate()
    const dispatch = useDispatch()
const {latest,popular,rondomMeal, rondomingredints,  randomDrinks}=useSelector((state)=>state.products)

const handleMealInfo=(id,title)=>{
    console.log("handleMealInfo>>>",id, title)
    navigete(`/drinks/${id}/${title}`)
}
const hadlePopularMeal = (title,description) => {
    navigete(`/ingredient/${title}`)
    dispatch(onDescription(description))
}
const randomMeals = (id, title) => {
    navigete(`/drinks/${id}/${title}`)
}
const  hadleRondomingredints  =( title)=>{
    navigete(`/ingredint/${title}`)
}
const hadleRandomDrinks= (id, title) => {
    navigete(`/drinks/${id}/${title}`)
}


let randomItems = [];
    if (rondomingredints && rondomingredints.length > 0) {
      for (let i = 0; i < 4; i++) {
        let randomIndex = Math.floor(Math.random() * rondomingredints.length);
        randomItems.push(rondomingredints[randomIndex]);
      }
    } else {
        console.error("randomIngredient is undefined or empty");
    }
    return (
        <section>
            <div className='container'>
                <div className={styles.home_seaarch}>
                    <form>
                        <div>
                            <input type="text" />
                        </div>
                        <div>
                            <button type='sulmit'><i class="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                    </form>
                </div>
                <div className={styles.meal_item}>
                    <h3>Latest Meals</h3>
                    <div className={styles.meal_item_content}>
                        <List
                         items={latest&&latest}
                         renderItem={(elem,i)=><MealItem key={i} onClick={()=>handleMealInfo(elem.idDrink, elem.strDrink)}
                          {...elem}/> }
                        />
                    </div>
                </div>
                <div className={styles.popular}>
                    <h3>Popular Ingredients</h3>
                    <div className={styles.popular_ingredients}>
                        <List
                            items={popular && popular}
                            renderItem={(elem, i) => {
                                if (i < 4) {
                                    return <PopularIngredints
                                        onClick={() => hadlePopularMeal(elem.strIngredient1,
                                            elem.strDescription)}
                                        key={i} {...elem} />
                                }
                            }}
                        />
                    </div>
                </div>
                <div className={styles.random_meals}>
                    <div className={styles.random_content}>
                        <h3>Random Meals</h3>
                        <div className={styles.random_images}>
                            <List
                                items={rondomMeal && rondomMeal}
                                renderItem={(elem, i) => (
                                    <MealItem onClick={()=>randomMeals(elem.idDrink, elem.strDrink)} key={i} {...elem} />
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.randomIng}>
                    <h3>Random Ingredients</h3>
                    <div className={styles.rondomingredints}>
                        <List
                            items={randomItems && randomItems}
                            renderItem={(elem, i) => (
                                <PopularIngredints  onClick={() => hadleRondomingredints (elem.idDrink, elem.strDrink)}  key={i} {...elem} />
                            )}
                        />
                    </div>
                </div>
                <div className={styles.random_meals}>
                    <div className={styles.random_content}>
                        <h3>Random Meals</h3>
                        <div className={styles.random_images}>
                            <List
                                items={randomDrinks && randomDrinks}
                                renderItem={(elem, i) => (
                                    <MealItem onClick={()=>hadleRandomDrinks(elem.idDrink, elem.strDrink)} key={i} {...elem} />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Home