import React, {useCallback, useEffect, useState} from 'react';
import classes from "./Item.module.css";
import useAxiosGetAllItems from "../../hooks/useAxiosGetAllItems";
import {useHistory, useParams} from "react-router-dom";
import itemLoanAction from "./ItemLoanAction";

const ItemBorrow = ( {handleLoanInterest, itemId, setItemId} ) => {



    const {id} = useParams()



    const history = useHistory();


    console.log(id)
    const participantId = id;
    console.log(participantId)

    //Error-handling
    const [error, setError] = useState(null);

    const [run, setRun] = useState(null);


    //Constant for dynamic CSS display
    const [errorCSS, setErrorCSS] = useState(false);

    //Dynamic use of CSS, other styles appear if input is invalid
    const inputClasses = errorCSS
        ? classes.invalid
        : classes.base;

    //Using custom hook useAxiosGetAllItems to get all the items from the list
    const { items, setItems } = useAxiosGetAllItems ();

    // console.log(items)
    // console.log(items[0].itemId)

    const goToBorrowActionLocation = (event) => {

        handleLoanInterest(event);

    }

    console.log(itemId)
    const itemIdSaved = itemId
    setItemId(itemId)
    console.log(itemIdSaved)
    if (itemIdSaved) {
        setItemId(itemIdSaved)
        console.log(itemId)
        history.push(`/item/loan/${itemId}`)
    }









    return (

        <ul>
            {/*checking that we have "items", then using the map-method to output the items*/}
            {items &&
                items.map(item =>
                    (
                        <div className={classes.actions} key={item.itemId}>
                        <h3>Name: {item.itemName} </h3>
                        <h3>ItemId: {item.itemId} </h3>
                        <h4>Description: {item.description}</h4>
                        <div className={classes.photo}>
                            <img src={item.photoURL} height={150} width={145}/>
                        </div>
                        <button onClick={(event) => goToBorrowActionLocation(setItemId(item.itemId)
                        )}
                        >Click to borrow me</button>
                    </div>))}
        </ul>
    );
};


export default ItemBorrow;