import React from 'react';
import classes from "./Button.module.css";

const BorrowButton = ( { onClick } ) => {
    return (
        <button className={classes.button}
                onClick={onClick}
        >
            <span>Spullen lenen?</span>
        </button>
    );
};

export default BorrowButton;