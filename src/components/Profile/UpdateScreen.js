import React from 'react';
import Layout from "../Layout/Layout";
import MainNavigation from "../Layout/MainNavigation";

const UpdateScreen = ( {firstName, lastName, email, mobileNumber, id } ) => {

    return (

        <div>
            {/*<MainNavigation*/}
            {/*    firstName={firstName}*/}
            {/*    lastName={lastName}*/}
            {/*    email={email}*/}
            {/*    mobileNumber={mobileNumber}*/}
            {/*    id={id}*/}

            {/*/>*/}
            <p>This is the update screen, welcome {lastName} with id: {email}</p>
        </div>
    );
};

export default UpdateScreen;