import {Fragment, useCallback, useEffect, useMemo, useState, useContext} from 'react';
import MainNavigation from './MainNavigation';
import ProfileForm from "../Profile/ProfileForm";
import {useHistory} from "react-router-dom";
import UpdateScreen from "../Profile/UpdateScreen";
import AuthContext from "../../context/auth-context";

const Layout = ({children }) => {

    //history used to navigate the user after either clicking on user details or on logout
    const history = useHistory();

    //Setting the state used to launch ProfileForm component on click
    const[userDetailsClicked, setUserDetailsClicked]= useState(false);

    //Define variable to manage back and forward buttons
    const [ locationKeys, setLocationKeys ] = useState([])

    const[formSubmission, setFormSubmission]= useState(false);

    // //Using useContext to manage the login-state
    // const authCtx = useContext(AuthContext);
    // const isLoggedIn = authCtx.isLoggedIn;


    //this function navigates the user away upon logout. Logout function in MainNavigaton sets the state back to false
    //and ProfileForm closes
    const hideUserDetailsLauncher = () => {
        setUserDetailsClicked(false)
        history.push('/profile/:id')
    }

    //Console log can here be used to monitor how the state changes upon click events,
    // to ensure that we get the wanted behaviour
    console.log(userDetailsClicked)

    // useEffect(() => {
    //     console.log("I render every time")
    //     // This method is expensive
    // });

    //This function uses props to setUserDetailsClicked to false, and logging out the user
    // const logoutHandler = () => {
    //     setUserDetailsClicked(false)
    //     authCtx.logout();
    // };



    //Once this function fires, SetUserDetailsClicked is true, and ProfileForm renders
    const userDetailsLauncher = () => {
        setUserDetailsClicked(true)
        history.push('/add-userdata')
    }

    useEffect(() => {
        console.log("I only render when the state changes on the dependent variable")

        return () => {
            //clean-up
            console.log("We unmounted")
        }
    },[userDetailsClicked]);


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
                    setUserDetailsClicked(false)
                }
            }
        })
    }, [ locationKeys ])



    return (
        <Fragment>
            <MainNavigation
                // Setting the required props
                onClickingUserDetails={userDetailsLauncher}
                onLogout={hideUserDetailsLauncher}
                setUserDetailsClicked={setUserDetailsClicked}
                userDetailsClicked={userDetailsClicked}
            />
            <ProfileForm
                setFormSubmission={setFormSubmission}
                formSubmission={formSubmission}

            />

            {/*Launching ProfileForm conditionally, above state must be "true" for component to launch*/}
            {userDetailsClicked &&
                <UpdateScreen
                    setUserDetailsClicked={setUserDetailsClicked}
                />}
            {/*{(userDetailsClicked && props.form) &&*/}
            {/*    <UpdateScreen*/}
            {/*        setUserDetailsClicked={setUserDetailsClicked}*/}
            {/*    />}*/}
            <main>{children}</main>
        </Fragment>
    );
};

export default Layout;