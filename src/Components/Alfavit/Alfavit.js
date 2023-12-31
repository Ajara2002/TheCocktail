import React from "react";
import styles from "./Alfavit.module.css"
import List from "../List";
import {getAlfavitMeal} from "../../Redux-toolkit/MealSlice/MealSlice"
import { useNavigate } from "react-router-dom";




const Alfavit = () => { 
    const alfavit = [
        "A",
        "B",
        "C",
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        "W",
        'X',
        'Y',
        'Z'
    ]
    const navigate=useNavigate()
    const ingredint=(title)=>{
        navigate(`/alfavit/${title.toLowerCase()}`)
    } 

    return (
        <div className={styles.content}>
            <List
                items={alfavit && alfavit}
                renderItem={(elem, i) => (
                      <>
                        <h2 key={i} onClick={()=>ingredint(elem)} >{elem}</h2>
                        <span>/</span>
                      </>
                )}
            />
        </div>
    )
}

export default Alfavit