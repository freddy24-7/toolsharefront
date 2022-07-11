import React from 'react';
import classes from "./Button.module.css";

const ListButton = ( { onClick } ) => {
    return (
        <button className={classes.button}
                onClick={onClick}
        >
            <span>Lijst van Deelneemers</span>
        </button>
    );
};

export default ListButton;