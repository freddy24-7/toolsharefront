import React from 'react';
import classes from "./Button.module.css";

//passing down props from MainNavigation
const BorrowButton = ( { onLoan } ) => {
    return (
        <button className={classes.button}
                onClick={onLoan}
        >
            <span>Spullen lenen?</span>
        </button>
    );
};

export default BorrowButton;