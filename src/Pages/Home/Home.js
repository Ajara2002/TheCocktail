import React, {useState} from 'react'
import styles from "./Home.module.css"
import MealItem from '../../Components/Meal-item'
import List from '../../Components/List/List'
import {useSelector,useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom'
import PopularIngredints from "../../Components/Popular-ingredints/Popular-ingredints"
import { onDescription } from "../../Redux-toolkit/MealSlice/MealSlice"
import Alfavit from '../../Components/Alfavit'
import CartComponent from '../../Components/Cart-Component/Cart-Component'


const Home = () => {
    const navigate=useNavigate()
    const dispatch = useDispatch()
const {latest,popular,rondomMeal, rondomingredints,  randomDrinks}=useSelector((state)=>state.products)

const handleMealInfo=(id,title)=>{
    console.log("handleMealInfo>>>",id, title)
    navigate(`/drinks/${id}/${title}`)
}
const hadlePopularMeal = (title,description) => {
    navigate(`/ingredient/${title}`)
    dispatch(onDescription(description))
}
const randomMeals = (id, title) => {
    navigate(`/drinks/${id}/${title}`)
}
const  hadleRondomingredints  =( title)=>{
    navigate(`/ingredint/$${title}`)
}
const hadleRandomDrinks= (id, title) => {
    navigate(`/drinks/${id}/${title}`)
}
const [input,setInput]=useState("")

const handleSubmit=(e)=>{
    e.preventDefault()
    navigate(`/search/${input}`)
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
            <div className={styles.home_search}>
          <form onSubmit={handleSubmit}>
            <div>
              <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" name="" id="" />
            </div>
            <div>
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
        </div>
        <section>
      <div className='container'>
        <CartComponent />
      </div>
    </section>
        
                <div className={styles.meal_item}>
                    <h3>Latest Drinks</h3>
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
                        <h3>Random Drinks</h3>
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
                    <div className={styles.rondomingredints}>
                    <h3>Random Ingredients</h3>
                        <List
                            items={randomItems}
                            renderItem={(elem, i) => (
                                <PopularIngredints  onClick={() => hadleRondomingredints (elem.strIngredient)}  key={i} {...elem} />
                            )}
                        />
                    </div>
                </div>
                <div className={styles.random_meals}>
                    <div className={styles.random_content}>
                        <h3>Random Drinks</h3>
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
                <div className={styles.alfavit}>
                    <h3>Browse By Name</h3>
                    <div className={styles.alfavit_content}>
                <Alfavit/>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Home