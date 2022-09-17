import React from 'react';
import classes from "./Button.module.css";

const LendButton = ( { onClick } ) => {
    return (
        <button className={classes.button}
                onClick={onClick}
        >
            <span>Spullen uitlenen?</span>
        </button>
    );
};

export default LendButton;