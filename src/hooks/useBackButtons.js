//Custom-hook from stack-overflow that defines the use of browser-buttons
import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

const UseBackButtons = () => {

    const history = useHistory();

    //Define variable to manage back and forward buttons
    const [ locationKeys, setLocationKeys ] = useState([])

    //The below useEffect manages the browser buttons (back-button and forward-button), to allow the
    // state to be updated based on back and forward browser-clicks
    // The below code bloc is an adaption of code from stackoverflow
    // and adjusted to hook-form, thereafter adapted to go back to the "login-component" - so that
    // the user is redirected to the welcome-screen (if logged in) and to the the login-page if not logged in
    // Link to stack overflow discussion is here:
    // https://stackoverflow.com/questions/39342195/intercept-handle-browsers-back-button-in-react-router
    useEffect(() => {

        return history.listen(location => {
            if (history.action === 'PUSH') {
                setLocationKeys([ location.key ])
                //Forward event:
                //We want to force the user to use the in-built buttons as much as possible
                //in this application. The way the back-event code is written, no forward event is possible
                //from this location
            }
            if (history.action === 'POP') {
                if (locationKeys[1] === location.key) {
                    setLocationKeys(([ _, ...keys ]) => keys)

                } else {
                    setLocationKeys((keys) => [ location.key, ...keys ])
                    // Back event
                    console.log("back button pressed")
                    history.push('/login')
                    window.location.reload()
                }
            }
        })

    })
    return { locationKeys, setLocationKeys }
};

export default UseBackButtons;