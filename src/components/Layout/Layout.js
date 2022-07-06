import {Fragment, useCallback, useEffect, useMemo, useState} from 'react';

import MainNavigation from './MainNavigation';
import ProfileForm from "../Profile/ProfileForm";
import {useHistory} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../context/auth-context";
import ConfirmationScreen from "../Profile/ConfirmationScreen";


//PROPS-USECASE: We want to close the ProfileForm when form is submitted
//Step 1-5 in parent component, step 6-7 in child component
//Step 1: import Profile-form to parent component (here: Layout)
//Step 2: Define the useState variable (here: formS)
//Step 3: Define a function that sets the state and pushes the user to the next location (here: hideUserDetailsLauncher)
//Step 4: In the JSX under the return statement, we render the ProfileForm conditionally
//Step 5: Also in the JSX, we set the prop and give it an "on-name", here "onSubmit", and make it point to the function defined in step 3
//Step 6: We pass the prop to the child component, here deconstructed as "onSubmit". We place the prop at the "button" as onClick={onSubmit}

const Layout = ({ children }) => {

    //Using useContext to manage the login-state
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    //history used to navigate the user after either clicking on user details or on logout
    const history = useHistory();

    //Define variable to manage back and forward buttons
    const [ locationKeys, setLocationKeys ] = useState([])

    //This useEffect manages the browserbuttons (back-button and forward-button), to allow the
    //state to be updated based on back and forward browser-clicks
    useEffect(() => {
        return history.listen(location => {
            if (history.action === 'PUSH') {
                setLocationKeys([ location.key ])
            }
            if (history.action === 'POP') {
                if (locationKeys[1] === location.key) {
                    setLocationKeys(([ _, ...keys ]) => keys)
                    //Forward event:
                    //We want to force the user to use the in-built buttons as much as possible
                    //in this application. The way the back-event code is written, no forward event is possible
                    //from this location

                } else {
                    setLocationKeys((keys) => [ location.key, ...keys ])
                    // Back event
                    console.log("back button pressed")
                    history.push('/')
                    // setUserDetailsClicked(false)
                }
            }
        })
    }, [ locationKeys ])

    //This variable is further worked on in child components through props
    const [formS, setFormS]= useState(false);

    return (
        <Fragment>
            <MainNavigation
                formS={formS}
                setFormS={setFormS}
            />

            {/*// Launching ProfileForm conditionally, above state must be "true" for component to launch*/}
            {/*The below structure allows the ProfileForm-component to load if login has happened, but not after*/}
            {/*profile-form submission.*/}
            {/*Below is a case of conditional rendering*/}
            {(isLoggedIn && !formS) ?
                <ProfileForm
                    setFormS={setFormS}
                    formS={formS}
                />
                : null
            }
            {(isLoggedIn && formS) ?
                <ConfirmationScreen
                    formS={formS}
                />
                : null
            }
            {/*"Children" are here used to create a wrapper component that makes a "header" for the whole application*/}
            {/*In the app-component, this Layout-component wraps the other components */}
            <main>{children}</main>
        </Fragment>
    );
};

export default Layout;