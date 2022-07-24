import {Fragment, useCallback, useEffect, useMemo, useState} from 'react';

import MainNavigation from './MainNavigation';
import ProfileForm from "../Profile/ProfileForm";
import {Route, useHistory, useParams} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../context/auth-context";
import ParticipantList from "../Profile/ParticipantList";
import IndividualDetails from "../Profile/IndividualDetails";
import ConfirmationScreen from "../Profile/ConfirmationScreen";
import ParticipantService from "../../services/ParticipantService";
import ConfirmDeleteParticipant from "../Profile/ConfirmDeleteParticipant";


//PROPS-USECASE: We want to close the ProfileForm when form is submitted
//Step 1-5 in parent component, step 6-7 in child component
//Step 1: import Profile-form to parent component (here: Layout)
//Step 2: Define the useState variable (here: formS)
//Step 3: Define a function that sets the state and pushes the user to the next location
//Step 4: In the JSX under the return statement, we render the ProfileForm conditionally
//Step 5: Also in the JSX, we set the prop and give it an "on-name", here "onSubmit", and make it point to the function defined in step 3
//Step 6: We pass the prop to the child component, here deconstructed as "onSubmit". We place the prop at the "button" as onClick={onSubmit}

const Layout = ({ children }) => {

    //Defining the variables
    const [id, setId] = useState(null);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')

    //Creating the variable that will be used to send data to backend
    const participant = {firstName, lastName, email, mobileNumber}

    //Error-handling
    const [error, setError] = useState(null);
    //Constant for dynamic CSS display
    const [errorCSS, setErrorCSS] = useState(false);

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
                }
            }
        })
    }, [ locationKeys ])

    //This variable is further worked on in child components through props
    const [formS, setFormS]= useState(false);

    //This edit-submission variable is further worked on in child components through props
    const [editS, setEditS]= useState(false);

    //Setting the state used to launch ParticipantList component on click
    const[participantListClicked, setParticipantListClicked]= useState(false);

    //This function is used to set the state used to launch ParticipantList component on click
    const participantListClickHandler = () => {
        setParticipantListClicked(true);
        history.push('/participants')
    }

    //This function is used to close the ParticipantList component on click
    const participantListCloseHandler = () => {
        setParticipantListClicked(false);
        history.push('/')
    }

    //Setting the state used to launch ParticipantList component on click
    const[participantDetailsClicked, setParticipantDetailsClicked]= useState(false);

    //This function is used to close the ParticipantDetails component on click
    const participantDetailsCloseHandler = () => {
        setParticipantDetailsClicked(false);
        history.push('/')
    }


        //Below is the axios call to the participant class in backend
        const submitHandler = (event) => {
            event.preventDefault();
            console.log(id)

            ParticipantService.saveParticipant(participant)
                .then((response) => {

                    //Checking in console what data we obtain
                    console.log(response.data)
                    console.log(response.data.id)
                    const currentId = (response.data.id)
                    const firstName = (response.data.firstName)
                    const lastName = (response.data.lastName)
                    const email = (response.data.email)
                    const mobileNumber = (response.data.mobileNumber)
                    console.log(currentId)
                    setId(currentId)
                    console.log(id)
                    // setForm(true)
                    console.log(firstName)
                    console.log(lastName)
                    console.log(email)
                    console.log(mobileNumber)

                    //we have access to firstName and we pass that on with a string literal:
                    // history.push(`/participant/${response.data.firstName}`)
                    history.push(`/participant/${response.data.firstName}`)
                    setFormS(true)
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setMobileNumber("");


                }).catch(error => {
                    //500 is the only backend error response possible in this configuration

                    //checking error response stats
                    console.log(error.response.status);
                    //storing it in a variable
                    const errorCheck = (error.response.status)
                    //setting the error
                if (errorCheck === 500) {
                    setError("Invalid user details entered. " +
                        "Please check that your email address is valid and that your mobile number" +
                        " has ten digits. Name sections also need to be filled out." +
                        " This error would also occur if you have entered an email address that is " +
                        "already in use. You may therefore also try with another email address.")
                    setErrorCSS(true)
                    }

                }
            );

        }


    //Opens the edit component, closes the other components
        const handleEdit = () => {
        history.push(`/edit/${id}`);
        console.log("edit button pressed")
        setParticipantDetailsClicked(true);
        setParticipantListClicked(false)
    }
    const [deleted, setDeleted] = useState(false);

    //Opens the delete component, closes the other components
    const handleDelete = () => {
        history.push(`/delete/${id}`);
        console.log("delete button pressed")
        setParticipantDetailsClicked(false);
        setParticipantListClicked(false)
        setDeleted(true)
    }

    return (
        <Fragment>
            {/*setting the props to the child component*/}
            <MainNavigation
                formS={formS}
                setFormS={setFormS}
                onClick={participantListClickHandler}
                onMove={participantListCloseHandler}
                setParticipantListClicked={setParticipantListClicked}
                onDetailsMove={participantDetailsCloseHandler}
                setParticipantDetailsClicked={setParticipantDetailsClicked}
                id={id}
                handleEdit={handleEdit}
                setDeleted={setDeleted}
                deleted={deleted}
            />

            {/*// Launching ProfileForm conditionally, above state must be "true" for component to launch*/}
            {/*The below structure allows the ProfileForm-component to load if login has happened, but not after*/}
            {/*profile-form submission.*/}
            {/*Below is a case of conditional rendering*/}
            {(isLoggedIn && !formS) ?
                <ProfileForm
                    setFormS={setFormS}
                    formS={formS}
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    email={email}
                    setEmail={setEmail}
                    mobileNumber={mobileNumber}
                    setMobileNumber={setMobileNumber}
                    submitHandler={submitHandler}
                    error={error}
                    setError={setError}
                    errorCSS={errorCSS}
                    setErrorCSS={setErrorCSS}
                    id={id}
                />
                : null
            }
            {/*Same logic for ParticipantList component*/}
            {(participantListClicked && formS ) ?
                <ParticipantList
                    // participants={participantList}
                />
                : null
            }
            {/*Same logic for ParticipantList component*/}
            {(participantDetailsClicked && formS ) ?
                <Route path='/edit/:id'>
                    <IndividualDetails
                        setFormS={setFormS}
                        formS={formS}
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                        email={email}
                        setEmail={setEmail}
                        mobileNumber={mobileNumber}
                        setMobileNumber={setMobileNumber}
                        id={id}
                        setId={setId}
                        editS={editS}
                        setEditS={setEditS}
                        formS={formS}
                        handleDelete={handleDelete}
                    />
                </Route>
                : null
            }

            {(!participantListClicked && !participantDetailsClicked && formS) || editS ?
                <Route path='/participant/:id'>
                <ConfirmationScreen
                />
                </Route>
                : null
            }
            {(!participantListClicked && !participantDetailsClicked && formS) || !editS ?
                <Route path='/delete/:id'>
                    <ConfirmDeleteParticipant
                        handleDelete={handleDelete}
                    />
                </Route>
                : null
            }
            {/*"Children" are here used to create a wrapper component that makes a "header" for the whole application*/}
            {/*In the app-component, this Layout-component wraps the other components */}
            <main>{children}</main>
        </Fragment>
    );
};

export default Layout;