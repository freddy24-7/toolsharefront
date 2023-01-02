import React from 'react';
import classes from "./Button.module.css";

//passing down props from MainNavigation
const ListButton = ( { onClick } ) => {
    return (
        <button className={classes.button}
                onClick={onClick}
        >
            <span>Lijst van Deelnemers</span>
        </button>
    );
};

export default ListButton;