import React, {Fragment, useContext, useState} from 'react';
import AuthContext from "../../context/auth-context";
import classes from "./Item.module.css";
import useAxiosGetAllItems from "../../hooks/useAxiosGetAllItems";
import {useParams} from "react-router-dom";

const ItemBorrow = ({itemId}, item) => {

    const {id} = useParams()

    console.log(id)
    const participantId = id;
    console.log(participantId)

    //Error-handling
    const [error, setError] = useState(null);
    //Constant for dynamic CSS display
    const [errorCSS, setErrorCSS] = useState(false);

    //Using useContext to manage the login-state
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    //This variable is further worked on in child components through props
    const [formS, setFormS]= useState(false);

    //This edit-submission variable is further worked on in child components through props
    const [editS, setEditS]= useState(false);

    //Dynamic use of CSS, other styles appear if input is invalid
    const inputClasses = errorCSS
        ? classes.invalid
        : classes.base;

    //Using custom hook useAxiosGetAllItems to get all the items from the list
    const { items, setItems } = useAxiosGetAllItems ();

    return (

        <ul>
            {/*checking that we have "items", then using the map-method to output the items*/}
            {items &&
                items.map(item =>

                    ( <div className={classes.preview} key={item.itemId}>
                        <h3>Name: {item.itemName} </h3>
                        <h4>Description: {item.description}  </h4>
                    </div>))}
        </ul>
    );
};


export default ItemBorrow;