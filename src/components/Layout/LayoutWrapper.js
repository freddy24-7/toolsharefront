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
import useBackButtons from "../../hooks/useBackButtons";
import useFileUpload from "../../hooks/useFileUpload";

//PROPS-USECASE: We want to close the ProfileForm when form is submitted
//Step 1-5 in parent component, step 6-7 in child component
//Step 1: import Profile-form to parent component (here: LayoutWrapper)
//Step 2: Define the useState variable (here: formS)
//Step 3: Define a function that sets the state and pushes the user to the next location
//Step 4: In the JSX under the return statement, we render the ProfileForm conditionally
//Step 5: Also in the JSX, we set the prop and give it an "on-name", here "onSubmit", and make it point to the function defined in step 3
//Step 6: We pass the prop to the child component, here deconstructed as "onSubmit". We place the prop at the "button" as onClick={onSubmit}

const LayoutWrapper = ({ children }) => {

    const [idValue, setIdValue] = useState('');

    //Below block obtains the stored userid
    const [currentLoggedInId, setCurrentLoggedInId] = useState(() => {
        // getting stored value
        const currentId = localStorage.getItem("userId");
        setIdValue(JSON.parse(currentId));
    });
    console.log(idValue);
    console.log(currentLoggedInId)

    //using the useBackButtons custom hook
    const { locationKeys, setLocationKeys } = useBackButtons ();

    //Here we cycle through participant-object to check if user is already registered as participant
    const [participants, setParticipants] = useState([]);
    //Getting existing users in database
    useEffect(() => {
        ParticipantService.getAllParticipants().then((response) => {
            console.log(response.data)
            setParticipants(response.data);
            const participants = response.data;
            console.log(participants);
            console.log(idValue)
            for (let i = 0; i < participants.length; i++) {
                if (participants[i].user.id == idValue) {
                    console.log("exists")
                    console.log(participants[i])
                    const currentLoggedInParticipant = participants[i]
                    console.log(currentLoggedInParticipant)
                    const currentId = (currentLoggedInParticipant.id)
                    const firstName = (currentLoggedInParticipant.firstName)
                    const lastName = (currentLoggedInParticipant.lastName)
                    const email = (currentLoggedInParticipant.email)
                    const mobileNumber = (currentLoggedInParticipant.mobileNumber)
                    const photoURL = (currentLoggedInParticipant.photoURL)
                    console.log(currentId)
                    console.log(firstName)
                    console.log(lastName)
                    console.log(email)
                    console.log(mobileNumber)
                    console.log(photoURL)
                    console.log(currentId)
                    setId(currentId)
                    console.log(id)
                    history.push(`/participant/${currentLoggedInParticipant.firstName}`)
                    setFormS(true);
                } else {
                    console.log("this user is not a participant yet")
                    setFormS(false);
                }
            }
        }).catch(error => {
            console.log(error)
        })
    },[]);

    //Defining the variables for uploading new participant
    const [id, setId] = useState(null);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [photoURL, setPhotoURL] = useState('')

    //Creating the variable that will be used to send data to backend
    const participant = {firstName, lastName, email, mobileNumber, photoURL}

    //Error-handling
    const [error, setError] = useState(null);
    //Constant for dynamic CSS display
    const [errorCSS, setErrorCSS] = useState(false);

    //Using useContext to manage the login-state
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    //history used to navigate the user after either clicking on user details or on logout
    const history = useHistory();

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
                    console.log(response)
                    const currentId = (response.data.id)
                    const firstName = (response.data.firstName)
                    const lastName = (response.data.lastName)
                    const email = (response.data.email)
                    const mobileNumber = (response.data.mobileNumber)
                    const photoURL = (response.data.photoURL)
                    console.log(currentId)
                    setId(currentId)
                    console.log(id)
                    console.log(firstName)
                    console.log(lastName)
                    console.log(email)
                    console.log(mobileNumber)
                    console.log(photoURL)

                    //we have access to firstName, and we pass that on with a string literal:
                    history.push(`/participant/${response.data.id}`)
                    setFormS(true)
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setMobileNumber("");
                    setPhotoURL("");

                }).catch(function (error) {

                    if (error.response) {
                        // Request made and server responded
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        const errorCheck = (error.response.status)
                        //setting the error
                        if (errorCheck === 500) {
                            setError("Invalid user details entered. " +
                                "Please check that your email address is valid and that your mobile number" +
                                " has ten digits. Name sections also need to be filled out." +
                                " This error would also occur if you have entered an email address that is " +
                                "already in use. You may therefore also try with another email address.")
                            setErrorCSS(true)
                        } else if (errorCheck === 403) {
                            setError("The server has declined the request. " +
                                "A likely reason is that another participant is already " +
                                " logged in to the server from the device that you are using. " +
                                "You may try to reload the page and submit again.")
                            setErrorCSS(true)
                        }
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
            });
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
                    photoURL={photoURL}
                    setPhotoURL={setPhotoURL}
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
            {/*Same logic for Individual details component*/}
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
            {/*In the app-component, this LayoutWrapper-component wraps the other components */}
            <main>{children}</main>
        </Fragment>
    );
};

export default LayoutWrapper;