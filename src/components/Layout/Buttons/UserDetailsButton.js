import React from 'react';
import classes from './Button.module.css'

//passing down props from MainNavigation
const UserDetailsButton = ( {onEdit} ) => {
    return (

        <button className={classes.button}
                onClick={onEdit}
        >
            <span>Details bewerken</span>
        </button>
    );
};

export default UserDetailsButton;