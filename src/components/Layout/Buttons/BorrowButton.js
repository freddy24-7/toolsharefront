import React from 'react';
import classes from "./Button.module.css";

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