import React, {useEffect, useState} from 'react';
import classes from "./Item.module.css";
import {useParams} from "react-router-dom";

const ItemLoanAction = () => {

    const {itemId} = useParams()
    console.log(itemId)



    return (

        <section>
            <section className={classes.base} >
                <div className={classes.control}>
                    <p className={classes.success}>You have indicated interest in ...</p>
                </div>
            </section>

        </section>
    );
};

export default ItemLoanAction;