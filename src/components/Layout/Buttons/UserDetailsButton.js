import React from 'react';
import classes from './Button.module.css'

const UserDetailsButton = ( {onEdit} ) => {
    return (

        <button className={classes.button}
                onClick={onEdit}
        >
            <span>Edit mijn details</span>
        </button>
    );
};

export default UserDetailsButton;