import React, {useEffect, useState} from 'react';
import classes from "./Item.module.css";
import {useParams} from "react-router-dom";
import axios from "axios";

import {GET_HISTORY_OF_VIEWED_ITEMS} from "../../backend-urls/constants";
import useAxiosGetAllItems from "../../hooks/useAxiosGetAllItems";

//specifying back-end URL
const apiURL = GET_HISTORY_OF_VIEWED_ITEMS;

//Obtaining token from local storage to access resource
//Key is specified in LoginForm.js and needs to be consistent
const initialToken = localStorage.getItem('jwt');
console.log(initialToken)

const ViewedOwnersList = () => {

    const {id} = useParams()
    console.log(id)

    // Defining the variables for participant
    const [myViewedItems, setMyViewedItems] = useState(null)
    const [viewedItems, setViewedItems] = useState([])

    //Obtaining token from local storage to access resource
    //Key is specified in LoginForm.js and needs to be consistent
    const initialToken = localStorage.getItem('jwt');
    console.log(initialToken)
    console.log(apiURL)

    const authAxios = axios.create(
        {
            baseURL: apiURL,
            headers: {
                Authorization: `Bearer ${initialToken}`
            }
        }
    )

    //Modifying URL to check by id
    const earlierViewedItemsSubmitter = apiURL + "/" + id;
    console.log(earlierViewedItemsSubmitter)

    const {items} = useAxiosGetAllItems();
    console.log(items)

    //Runs once, to give the existing data
    useEffect(() => {
        authAxios.get(earlierViewedItemsSubmitter)
            .then((response) => {
                console.log(response)
                console.log(response.data)
                console.log(response.data.id)
                console.log(response.data.loanActions)
                const myViewedItems = response.data.loanActions;
                console.log(myViewedItems)
                setMyViewedItems(myViewedItems)
                console.log(myViewedItems)
            }).catch(error => {
            console.log(error)
            console.log(error.response.data)
        })
        return () => {};
    }, [])

    console.log(items)
    console.log(myViewedItems)

    useEffect(()=> {
        //Using the timeout method to create a microscopic delay to avoid getting null values
        //using this as a workaround
        //code runs after the other useEffect as "myViewedItems" has state update in the other useEffect,
        //which then triggers this code-block to run given the dependency array
        setTimeout(function() {
            //merging to the two object arrays by mapping through them, using the itemId as key
            const mergedArray = myViewedItems.map(m => ({ ...m, ...items.find(i => i.itemId === m.itemId) }));
            setViewedItems(mergedArray)
            console.log(viewedItems)
        }, 0);
    },[myViewedItems])

    console.log(viewedItems)

    //Modifying the dateformat that is received through the API (which was created by LocalDateTime in Java/SpringBoot)
    const now = new Date()
    let inbuiltDateFormat = now.toLocaleDateString()
    console.log(inbuiltDateFormat)

    return (

        <section>
            <section className={classes.base} >
                <div className={classes.control}>
                    <p className={classes.success}>Previous times you have checked out owner details</p>
                </div>
            </section>
            <ul>
                {/*checking that we have "items", then using the map-method to output the items*/}
                {viewedItems &&
                    viewedItems.map(item =>

                        ( <div className={classes.actions} key={item.itemId}>
                            <h5>Loan Id: {item.loanId}</h5>
                            <h5>Item Id: {item.itemId}</h5>
                            <h3>Name: {item.itemName} </h3>
                            <h4>Description: {item.description}</h4>
                            <div className={classes.photo}>
                                <img src={item.photoURL} height={150} width={145}/>
                            </div>
                            <h4>Date: {item.inbuiltDateFormat}</h4>
                            {inbuiltDateFormat}
                            <br/>
                            <br/>
                            <p>*************************************</p>
                        </div>))}
            </ul>
        </section>
    );
};

export default ViewedOwnersList;