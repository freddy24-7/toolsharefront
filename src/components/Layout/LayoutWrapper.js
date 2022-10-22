import {Fragment, useEffect, useState} from 'react';

import MainNavigation from './MainNavigation';
import ProfileForm from "../Profile/ProfileForm";
import {Route, useHistory, useParams} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../context/auth-context";
import ParticipantList from "../Profile/ParticipantList";
import IndividualDetails from "../Profile/IndividualDetails";
import ConfirmationScreen from "../Profile/ConfirmationScreen";
import ItemLendForm from "../LoanItems/ItemLendForm";
import ItemBorrow from "../LoanItems/ItemBorrow";
import ItemLoanAction from "../LoanItems/ItemLoanAction";
import ParticipantItemList from "../LoanItems/ParticipantItemList";
import ParticipantService from "../../services/ParticipantService";
import ConfirmDeleteParticipant from "../Profile/ConfirmDeleteParticipant";
import useBackButtons from "../../hooks/useBackButtons";
import axios from "axios";
import {POST_SHARE_ITEM_URL} from "../../backend-urls/constants";

//PROPS-USECASE: We want to close the ProfileForm when form is submitted
//Step 1-5 in parent component, step 6-7 in child component
//Step 1: import Profile-form to parent component (here: LayoutWrapper)
//Step 2: Define the useState variable (here: formS)
//Step 3: Define a function that sets the state and pushes the user to the next location
//Step 4: In the JSX under the return statement, we render the ProfileForm conditionally
//Step 5: Also in the JSX, we set the prop and give it an "on-name", here "onSubmit", and make it point to the function defined in step 3
//Step 6: We pass the prop to the child component, here deconstructed as "onSubmit". We place the prop at the "button" as onClick={onSubmit}

const LayoutWrapper = ({ children }) => {

    const [id, setId] = useState(null);
    console.log(id)

    const [idValue, setIdValue] = useState('');

    const [firstSubmissionDone, setFirstSubmissionDone] = useState(false);


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
            for (let i = 0; i < participants.length; i++)
                if (participants[i].user.id == idValue) {
                    console.log("exists")
                    console.log(participants[i])
                    const currentLoggedInParticipant = participants[i]
                    console.log(currentLoggedInParticipant.id);
                    const currentLoggedInParticipantId = currentLoggedInParticipant.id;
                    console.log(currentLoggedInParticipantId)
                    setId(currentLoggedInParticipantId);
                    // history.push(`/participant/${currentLoggedInParticipant.id}`)
                    history.push(`/participant/${currentLoggedInParticipantId}`)
                    setFormS(true);
                } else {
                    console.log("this user is not a participant yet")
                    setFormS(false);
                }
        }).catch(error => {
            console.log(error)
        })

    },[]);
    console.log(id)


    //Defining the variables for uploading new participant
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

    //Setting the state used to launch Item component on click
    const[shareItemClicked, setShareItemClicked]= useState(false);

    //Setting the state used to launch Item component on click
    const[loanItemClicked, setLoanItemClicked]= useState(false);

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

    //This function is used to set the state used to launch shareItem component on click
    const shareItemClickHandler = () => {
        setShareItemClicked(true);
        history.push(`/items/${id}`);
        console.log("share item button pressed")
        setParticipantDetailsClicked(false);
        setParticipantListClicked(false)
    }

    //This function is used to close the shareItem component on click
    const shareItemCloseHandler = () => {
        setShareItemClicked(false);
        history.push('/')
    }

    //This function is used to set the state used to launch shareItem component on click
    const loanItemClickHandler = () => {
        setLoanItemClicked(true);
        history.push(`/loan/items/${id}`)
        console.log("borrow item button pressed")
        setParticipantDetailsClicked(false);
        setParticipantListClicked(false)
    }

    //This function is used to close the shareItem component on click
    const loanItemCloseHandler = () => {
        setLoanItemClicked(false);
        history.push('/')
    }

    //Setting the state used to launch ParticipantDetails component on click
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
                    console.log(firstSubmissionDone)
                    //the below if check is used to allow the user to go to the welcome screen directly
                    //from log in if all the earlier registrations were already done
                    if (!firstSubmissionDone) {
                        history.push(`/participant/${response.data.id}`)
                        setFirstSubmissionDone(true);
                        setFormS(true)
                        setFirstName("");
                        setLastName("");
                        setEmail("");
                        setMobileNumber("");
                        setPhotoURL("");
                    }
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
        setShareItemClicked(false)
        setLoanItemClicked(false)
        setDeleted(true)
    }

    const [itemId, setItemId] = useState(null);

    //Opens the loan component, closes the other components
    const handleLoanInterest = () => {
        console.log("borrow me button pressed")
        setParticipantDetailsClicked(false);
        setParticipantListClicked(false)
        setShareItemClicked(false)
        setLoanItemClicked(true)
    }

    //Opens my item list component, closes the other components
    const handleMyListOfItems = () => {
        history.push(`/my-item/list/${id}`);
        console.log("my list me button pressed")
        setParticipantDetailsClicked(false);
        setParticipantListClicked(false)
        setShareItemClicked(false)
        setLoanItemClicked(false)
    }

    //Below is the axios call to the item class in backend
    console.log(id)
    const participantId = id;
    console.log(participantId)


    //Defining the variables for uploading new item
    const [itemName, setItemName] = useState('')
    const [description, setDescription] = useState('')

    //Modifying URL to check by id
    const itemSubmitter = POST_SHARE_ITEM_URL + "/" + participantId;
    console.log(itemSubmitter)

    //Variables used for the form submission
    const [isLoading, setIsLoading] = useState(false);

    //Creating the variable that will be used to send data to backend
    const loanItem = { participantId, itemName, description, photoURL }

    const [obtainPhotoURL, setObtainPhotoURL] = useState('');

    const itemSubmitHandler = (event) => {
        event.preventDefault();
        axios.post(itemSubmitter, loanItem)
            .then((response) => {
                //Checking in console what data we obtain
                console.log(response)
                console.log(response.status)
                const itemStatus = response.status
                console.log(itemStatus)
                const itemId = response.data.itemId
                console.log(itemId)
                setItemId(itemId);
                if (itemStatus === 200) {
                    setIsLoading(true)
                }
                const itemName = (response.data.itemName)
                const description = (response.data.description)
                // console.log(id)
                console.log(itemName)
                console.log(description)

                setFormS(true)
                setItemName("");
                setDescription("");
                setObtainPhotoURL("");
                setPhotoURL("")


            }).catch(error => {

            //checking error response stats
            console.log(error.response.status);
            //storing it in a variable
            const errorCheck = (error.response.status)
            //setting the error
            if (errorCheck === 500) {
                setError("An error occurred. Please upload photo to continue")
            }
            setIsLoading(false);
        });
        setIsLoading(true);
        //Have to set the error back to null here!
        setError(null);
    };



    return (
        <Fragment>
            <MainNavigation
                formS={formS}
                setFormS={setFormS}
                onClick={participantListClickHandler}
                onMove={participantListCloseHandler}
                setShareItemClicked={setShareItemClicked}
                onShare={shareItemClickHandler}
                onCloseShare={shareItemCloseHandler}
                setParticipantListClicked={setParticipantListClicked}
                setLoanItemClicked={setLoanItemClicked}
                onLoan={loanItemClickHandler}
                onCloseLoan={loanItemCloseHandler}
                onDetailsMove={participantDetailsCloseHandler}
                setParticipantDetailsClicked={setParticipantDetailsClicked}
                id={id}
                handleEdit={handleEdit}
                shareItemClickHandler={shareItemClickHandler}
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
            {(participantListClicked && formS && !firstSubmissionDone) ?
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
                        participantId={participantId}
                        handleDelete={handleDelete}
                    />
                </Route>
                : null
            }
            {(shareItemClicked && formS ) ?
                <Route path='/items/:id'>
                    <ItemLendForm
                        setFormS={setFormS}
                        formS={formS}
                        itemName={itemName}
                        setItemName={setItemName}
                        description={description}
                        setDescription={setDescription}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        photoURL={photoURL}
                        setPhotoURL={setPhotoURL}
                        obtainPhotoURL={obtainPhotoURL}
                        setObtainPhotoURL={setObtainPhotoURL}
                        error={error}
                        errorCSS={errorCSS}
                        handleMyListOfItems={handleMyListOfItems}
                        itemSubmitHandler={itemSubmitHandler}
                    />
                </Route>
                : null
            }
            {(loanItemClicked && formS ) ?
                <Route path='/loan/items/:id'>
                    <ItemBorrow
                        error={error}
                        errorCSS={errorCSS}
                        // itemId={itemId}
                        // setItemId={setItemId}
                        handleLoanInterest={handleLoanInterest}
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
            {(formS ) ?
                <Route path='/item/loan/:itemId'>
                <ItemLoanAction
                    itemId={itemId}
                    setItemId={setItemId}
                />
                </Route>
                : null
            }
            {(formS ) ?
                <Route path='/my-item/list/:id'>
                    <ParticipantItemList
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