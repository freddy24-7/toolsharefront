import {Fragment, useEffect, useState} from 'react';

import MainNavigation from './MainNavigation';
import ProfileForm from "../Profile/ProfileForm";
import {Route, useHistory } from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../context/auth-context";
import ParticipantList from "../Profile/ParticipantList";
import IndividualDetails from "../Profile/IndividualDetails";
import ConfirmationScreen from "../Profile/ConfirmationScreen";
import ItemLendForm from "../LoanItems/ItemLendForm";
import ItemBorrow from "../LoanItems/ItemBorrow";
import ItemLoanAction from "../LoanItems/ItemLoanAction";
import ParticipantItemList from "../LoanItems/ParticipantItemList";
import ViewItemOwnerDetails from "../LoanItems/ViewItemOwnerDetails";
import ViewedOwnersList from "../LoanItems/ViewedOwnersList";
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

    //Below code-block to persist state, after refresh that happens after the UpdateParticipant-component is fired
    useEffect(()=> {
        const data = localStorage.getItem('submission');
        if (data) {
            setFormS(JSON.parse(data))
        }
    },[]);
    useEffect(() => {
        localStorage.setItem("submission", JSON.stringify(formS));
    });

    //Below block obtains the stored userid, and stores in variable "idValue"
    const [idValue, setIdValue] = useState('');
    const [currentLoggedInId, setCurrentLoggedInId] = useState(() => {
        // getting stored value
        const currentId = localStorage.getItem("userId");
        setIdValue(JSON.parse(currentId));
    });

    //DEFINING VARIABLES

    //Id for participants
    const [id, setId] = useState(null);

    //using the useBackButtons custom hook
    const { locationKeys, setLocationKeys } = useBackButtons ();

    //Defining the variables for uploading new participant
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [postcode, setPostcode] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [photoURL, setPhotoURL] = useState('')

    //Creating the participant-variable that will be used to send data to backend
    const participant = {firstName, lastName, postcode, email, mobileNumber, photoURL}
    const [participants, setParticipants] = useState(null)

    //Error-handling
    const [error, setError] = useState(null);
    //Constant for dynamic CSS display
    const [errorCSS, setErrorCSS] = useState(false);

    //Using useContext to manage the login-state
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    //history used to navigate the user
    const history = useHistory();
    //This prop indicates whether participant-form-details are submitted or not
    const [formS, setFormS]= useState(false);
    //This prop indicates whether participant-details are edited or not
    const [editS, setEditS]= useState(false);

    //Variables for click-handlers
    const[participantListClicked, setParticipantListClicked]= useState(false);
    const[shareItemClicked, setShareItemClicked]= useState(false);
    const[loanItemClicked, setLoanItemClicked]= useState(false);
    const[ownerDetailsClicked, setOwnerDetailsClicked]= useState(false);
    const[visitedOwnerPageClicked, setVisitedOwnerPageClicked]= useState(false);
    const[participantDetailsClicked, setParticipantDetailsClicked]= useState(false);

    //Tool - or item - constants:
    const[ownerId, setOwnerId]= useState(null);
    const [itemName, setItemName] = useState('')
    const [description, setDescription] = useState('')
    const [itemId, setItemId] = useState(null);

    //For deletion class - for participants who wants to delete their details
    const [deleted, setDeleted] = useState(false);

    //This constant is used by a later submission function, down the page
    const itemSubmitter = POST_SHARE_ITEM_URL + "/" + id;

    //Variable used for form submission
    const [isLoading, setIsLoading] = useState(false);

    //Creating the variable that will be used to send data to backend on loanItems
    const loanItem = { id, itemName, description, photoURL }

    //URL for storing photos
    const [obtainPhotoURL, setObtainPhotoURL] = useState('');


    //HERE COMES A SERIES OF HANDLERS

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
        setOwnerDetailsClicked(false)
        setVisitedOwnerPageClicked(false)
    }

    //This function is used to close the shareItem component on click
    const shareItemCloseHandler = () => {
        setShareItemClicked(false);
        history.push('/')
    }

    //This function is used to set the state used to launch ownerDetails component on click
    const ownerDetailsClickHandler = () => {
        setOwnerDetailsClicked(true)
        history.push(`/item-owner/${ownerId}`);
        console.log("owner details button pressed")
        setShareItemClicked(false);
        setParticipantDetailsClicked(false);
        setParticipantListClicked(false)
        setVisitedOwnerPageClicked(false)
    }

    //This function is used to close the ownerDetails component on click
    const ownerDetailsCloseHandler = () => {
        setOwnerDetailsClicked(false)
        history.push('/')
    }

    //This function is used to set the state used to launch loanItem component on click
    const loanItemClickHandler = () => {
        setLoanItemClicked(true);
        history.push(`/loan/items/${id}`)
        console.log("borrow item button pressed")
        setParticipantDetailsClicked(false);
        setParticipantListClicked(false)
        setOwnerDetailsClicked(false)
        setVisitedOwnerPageClicked(false)
    }

    //This function is used to close the loanItem component on click
    const loanItemCloseHandler = () => {
        setLoanItemClicked(false);
        history.push('/')
    }

    //Opens owner details viewed component, closes the other components
    const handleOwnerDetailViewedItems = () => {
            setVisitedOwnerPageClicked(true)
            history.push(`/owner-pages-visited/${id}`);
            console.log("owner details button pressed")
            setParticipantDetailsClicked(false);
            setParticipantListClicked(false)
            setShareItemClicked(false)
            setLoanItemClicked(false)
            setOwnerDetailsClicked(true)
    }

    //This function is used to close the owner details viewed component on click
    const ownerDetailsViewedCloseHandler = () => {
        setOwnerDetailsClicked(false)
        history.push('/')
    }

    //This function is used to close the ParticipantDetails component on click
    const participantDetailsCloseHandler = () => {
        setParticipantDetailsClicked(false);
        history.push('/participant/${id}')
    }

    //Opens the edit component, closes the other components
            const handleEdit = () => {
            history.push(`/edit/${id}`);
            console.log("edit button pressed")
            setParticipantDetailsClicked(true);
            setParticipantListClicked(false)
            setOwnerDetailsClicked(false)
            setVisitedOwnerPageClicked(false)
    }

    //Opens the delete component, closes the other components
    const handleDelete = () => {
        history.push(`/delete/${id}`);
        console.log("delete button pressed")
        setParticipantDetailsClicked(false);
        setParticipantListClicked(false)
        setShareItemClicked(false)
        setLoanItemClicked(false)
        setDeleted(true)
        setOwnerDetailsClicked(false)
        setVisitedOwnerPageClicked(false)
        authCtx.logout();
    }

    //Opens the loan component, closes the other components
    const handleLoanInterest = () => {
        console.log("borrow me button pressed")
        setParticipantDetailsClicked(false);
        setParticipantListClicked(false)
        setShareItemClicked(false)
        setLoanItemClicked(true)
        setOwnerDetailsClicked(false)
        setVisitedOwnerPageClicked(false)
    }

    //Opens my item list component, closes the other components
    const handleMyListOfItems = () => {
        history.push(`/my-item/list/${id}`);
        console.log("my list me button pressed")
        setParticipantDetailsClicked(false);
        setParticipantListClicked(false)
        setShareItemClicked(false)
        setLoanItemClicked(false)
        setOwnerDetailsClicked(false)
        setVisitedOwnerPageClicked(false)
    }

    //BELOW THE FUNCTIONS FOR THIS COMPONENT - these are "hoisted" due to the reliance on prop-drilling for this application

    //This submitHandler saves a new tool that a participant wishes to lend out to others
    const itemSubmitHandler = (event) => {
        event.preventDefault();
        axios.post(itemSubmitter, loanItem)
            .then((response) => {
                //Checking in console what data we obtain
                const itemStatus = response.status
                const itemId = response.data.itemId
                setItemId(itemId);
                setFormS(true);
                if (itemStatus === 200) {
                    setIsLoading(true)
                }
                setFormS(true)
                setItemName("");
                setDescription("");
                setObtainPhotoURL("");
                setPhotoURL("")
            }).catch(error => {
            //checking error response stats
            // console.log(error.response.status);
            //storing it in a variable
            const errorCheck = (error.response.status)
            //setting the error
            if (errorCheck === 500) {
                setError("Er is een fout opgetreden. Upload een foto om door te gaan")
            }
            setIsLoading(false);
        });
        setIsLoading(true);
        //Have to set the error back to null here!
        setError(null);
    };

    //This submitHandler saves a new participant - that is a user (logged in) but not yet a participant
    const submitHandler = (event) => {
        event.preventDefault();
        ParticipantService.saveParticipant(participant)
            .then((response) => {
                //Checking in console what data we obtain
                console.log(response)
                const currentId = (response.data.id)
                setId(currentId)
                //we have access to firstName, and we pass that on with a string literal:
                //the below if check is used to allow the user to go to the welcome screen directly
                //from log in if all the earlier registrations were already done
                history.push(`/participant/${response.data.id}`)
                setFormS(true)
                setFirstName("");
                setLastName("");
                setPostcode("");
                setEmail("");
                setMobileNumber("");
                setPhotoURL("");
            }).catch(function (error) {
            if (error.response) {
                // Request made and server responded
                const errorCheck = (error.response.status)
                //setting the error
                if (errorCheck === 500) {
                    setError("Ongeldige gebruikersgegevens ingevoerd. " +
                        "Controleer of uw e-mailadres, mobiele nummer en '3543-postcode' allemaal geldig zijn. " +
                        " Alle velden moeten worden ingevuld, inclusief foto." +
                        " Deze fout treedt ook op als u een e-mailadres heeft ingevoerd " +
                        " die al in gebruik is. U kunt het daarom ook proberen met een ander e-mailadres.")
                    setErrorCSS(true)
                } else if (errorCheck === 403) {
                    setError("De server heeft het verzoek afgewezen. " +
                        "Een waarschijnlijke reden is dat er al een andere deelnemer is " +
                        " ingelogd op de server vanaf het apparaat dat u gebruikt. " +
                        "U kunt opnieuw proberen .")
                    setErrorCSS(true)
                }
            } else if (error.request) {
                // The request was made but no response was received
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });
    }

    //Here we cycle through participant-object to check if user is already registered as participant
    //Getting existing users in database
    //Earlier participants who are logging in again are taken directly to confirmation screen through push
    //Code-block runs once and runs before the submitHandler - given dependency array
    useEffect(() => {
        ParticipantService.getAllParticipants().then((response) => {
            const participants = response.data;
            setParticipants(response.data);
            console.log(idValue)
            for (let i = 0; i < participants.length; i++)
                if (participants[i].user.id === idValue) {
                    console.log("exists")
                    console.log(participants[i])
                    const currentLoggedInParticipant = participants[i]
                    console.log(currentLoggedInParticipant.id);
                    const currentLoggedInParticipantId = currentLoggedInParticipant.id;
                    console.log(currentLoggedInParticipantId)
                    setId(currentLoggedInParticipantId);
                    history.push(`/participant/${currentLoggedInParticipantId}`)
                    setFormS(true);
                } else {
                    console.log("this user is not a participant yet")
                }
        }).catch(error => {
            console.log(error)
        })
    },[]);

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
                onCloseOwner={ownerDetailsViewedCloseHandler}
                setOwnerDetailsClicked={ownerDetailsClickHandler}
                onCloseOwnerDetails={ownerDetailsCloseHandler}
                setVisitedOwnerPageClicked={setVisitedOwnerPageClicked}
                setParticipantDetailsClicked={setParticipantDetailsClicked}
                id={id}
                handleEdit={handleEdit}
                shareItemClickHandler={shareItemClickHandler}
                setDeleted={setDeleted}
                deleted={deleted}
                visitedOwnerPageClicked={visitedOwnerPageClicked}
            />

            {/*// Launching ProfileForm conditionally, above state must be "true" for component to launch*/}
            {/*The below structure allows the ProfileForm-component to load if login has happened, but not after*/}
            {/*profile-form submission.*/}
            {/*Below is a case of conditional rendering*/}
            {(isLoggedIn && !formS) ?
                <ProfileForm
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    postcode={postcode}
                    setPostcode={setPostcode}
                    email={email}
                    setEmail={setEmail}
                    mobileNumber={mobileNumber}
                    setMobileNumber={setMobileNumber}
                    submitHandler={submitHandler}
                    error={error}
                    errorCSS={errorCSS}
                    id={id}
                    photoURL={photoURL}
                    setPhotoURL={setPhotoURL}
                />
                : null
            }

            {/*Same logic for ParticipantList component*/}
            {(participantListClicked && formS ) ?
                <ParticipantList
                />
                : null
            }

            {/*Same logic for Individual details component*/}
            {(participantDetailsClicked && formS ) ?
                <Route path='/edit/:id'>
                    <IndividualDetails
                        error={error}
                        errorCSS={errorCSS}
                        editS={editS}
                        setEditS={setEditS}
                        handleDelete={handleDelete}
                        setFormS={setFormS}
                        formS={formS}
                    />
                </Route>
                : null
            }
            {(shareItemClicked && formS ) ?
                <Route path='/items/:id'>
                    <ItemLendForm
                        itemName={itemName}
                        setItemName={setItemName}
                        description={description}
                        setDescription={setDescription}
                        isLoading={isLoading}
                        itemSubmitHandler={itemSubmitHandler}
                        photoURL={photoURL}
                        handleMyListOfItems={handleMyListOfItems}
                        setPhotoURL={setPhotoURL}
                        error={error}
                        errorCSS={errorCSS}
                    />
                </Route>
                : null
            }
            {(loanItemClicked && formS ) ?
                <Route path='/loan/items/:id'>
                    <ItemBorrow
                        handleLoanInterest={handleLoanInterest}
                    />
                </Route>
                : null
            }

            {(!participantListClicked && !participantDetailsClicked && formS) || !editS ?
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
                    handleOwnerDetailViewedItems={handleOwnerDetailViewedItems}
                    ownerDetailsClickHandler={ownerDetailsClickHandler}
                    setOwnerId={setOwnerId}
                    ownerId={ownerId}
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
            {(formS && visitedOwnerPageClicked ) ?
                <Route path='/owner-pages-visited/:id'>
                    <ViewedOwnersList
                    />
                </Route>
                : null
            }
            {(formS && ownerDetailsClicked ) ?
                <Route path='/item-owner/:ownerId'>
                    <ViewItemOwnerDetails
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