import React from 'react';
import classes from "./Button.module.css";

const LendButton = ( { onShare } ) => {
    return (
        <button className={classes.button}
                onClick={onShare}
        >
            <span>Spullen uitlenen?</span>
        </button>
    );
};

export default LendButton;