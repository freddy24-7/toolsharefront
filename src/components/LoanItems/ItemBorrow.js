import React, {useState} from 'react';
import classes from "./Item.module.css";
import useAxiosGetAllItems from "../../hooks/useAxiosGetAllItems";
import {useHistory, useParams} from "react-router-dom";

const ItemBorrow = ( {handleLoanInterest} ) => {

    const {id} = useParams()

    const [itemId, setItemId] = useState(null);

    //history hook to push to the details page and away from the list
    const history = useHistory();

    //Using custom hook useAxiosGetAllItems to get all the items from the list
    const { items } = useAxiosGetAllItems ();

    //handles the various states in relation to the click event
    const goToBorrowActionLocation = (event) => {
        handleLoanInterest(event);
    }

    //Checking the prop before pushing it to details page
    console.log(itemId)
    if (itemId) {
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