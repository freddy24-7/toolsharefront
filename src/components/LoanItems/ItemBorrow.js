import React, {Fragment, useContext, useState} from 'react';
import AuthContext from "../../context/auth-context";
import classes from "./Item.module.css";

const ItemBorrow = () => {

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

    return (
        <div>
            <p>Hello new World</p>
        </div>
    );
};

export default ItemBorrow;