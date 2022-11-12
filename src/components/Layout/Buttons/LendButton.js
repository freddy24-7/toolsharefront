import React from 'react';
import classes from "./Button.module.css";

//passing down props from MainNavigation
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