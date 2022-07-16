// import React, {Fragment, useEffect, useState} from 'react';
// import classes from './ProfileForm.module.css';
// import {useHistory, useParams} from "react-router-dom";
// import leafblower from "../../assets/pexels-pixabay-162564.jpg";
// import ParticipantService from "../../services/ParticipantService";
//
// //Here we will use route parameters to access individual participants
// //Using "useParams", with "id" as key. Matches the ":id" key from the app component
// //Displays the username back to the user in the welcome message to the user
//
// const IndividualDetails = ({setFormS, firstName, lastName, email, mobileNumber,
//                                error, setError, errorCSS, setErrorCSS}) => {
//
//     // const { id } = useParams()
//     //
//     // const updatingParticipant = (event) => {
//     //     event.preventDefault();
//     //
//     //     if (id) {
//     //
//     //         ParticipantService.updateParticipant(id, participant).then(async (response) => {
//     //             console.log(response)
//     //
//     //             // history.push(`/participant/${response.data.firstName}`)
//     //         }).catch(error => {
//     //             console.log(error)
//     //             console.log(error.response.data)
//     //
//     //         })
//     //
//     //     }
//     //
//     // }
//     const { id } = useParams()
//
//     const history = useHistory();
//
//     const participant = {id, firstName, lastName, email, mobileNumber};
//
//     console.log(id)
//     console.log(firstName)
//     console.log(lastName)
//     console.log(email)
//     console.log(mobileNumber)
//     console.log(participant)
//
//     if (id) {
//         ParticipantService.updateParticipant(id, participant).then((response) => {
//             console.log(response)
//             // history.push(`/participant/${response.data.firstName}`)
//         }).catch(error => {
//             console.log(error)
//             console.log(error.response.data)
//
//         })
//
//     }
//     useEffect(() => {
//
//         ParticipantService.getParticipantById(id).then((response) =>{
//             console.log(response.data)
//             // setFirstName(response.data.firstName)
//             // setLastName(response.data.lastName)
//             // setEmail(response.data.email)
//         }).catch(error => {
//             console.log(error)
//             console.log(error.response.data)
//         })
//     },[]);
//
//     // useEffect(() => {
//     //
//     //     ParticipantService.getParticipantById(id).then((response) => {
//     //         console.log(response.data)
//     //         setFirstName(response.data.firstName)
//     //         setLastName(response.data.lastName)
//     //         setEmail(response.data.email)
//     //         setMobileNumber(response.data.mobileNumber)
//     //     }).catch(error => {
//     //         console.log(error)
//     //         console.log(error.response.data)
//     //     })
//     // });
//
//     // //This code section is made to simplify the JSX in the return statement
//     // const firstNameInputChangeHandler = (event) => {
//     //     setFirstName(event.target.value);
//     //     console.log(firstName)
//     // }
//     // const lastNameInputChangeHandler = (event) => {
//     //     setLastName(event.target.value);
//     //     console.log(lastName)
//     // }
//     // const emailInputChangeHandler = (event) => {
//     //     setEmail(event.target.value);
//     //     console.log(email)
//     // }
//     // const mobileNumberInputChangeHandler = (event) => {
//     //     setMobileNumber(event.target.value);
//     //     console.log(mobileNumber)
//     // }
//
//
//     //Dynamic use of CSS, other styles appear if input is invalid
//     const inputClasses = errorCSS
//         ? classes.invalid
//         : classes.base;
//
//
//     return (
//         <Fragment>
//             {/*<section className={inputClasses}>*/}
//             {/*    <div>*/}
//             {/*        <p>Change details here:</p>*/}
//             {/*        <br/>*/}
//             {/*        <br/>*/}
//             {/*        <p>Here you can change your details if you wish</p>*/}
//             {/*        <p>Earlier entered details are displayed</p>*/}
//             {/*    </div>*/}
//             {/*    <br/>*/}
//             {/*    <br/>*/}
//             {/*    <form onSubmit={updatingParticipant}>*/}
//             {/*        <div className={classes.control}>*/}
//             {/*            <div className={classes.control}>*/}
//             {/*                <label htmlFor='first name'>Please enter your first name</label>*/}
//             {/*                <input*/}
//             {/*                    type="text"*/}
//             {/*                    placeholder={firstName}*/}
//             {/*                    name="firstName"*/}
//             {/*                    className="form-control"*/}
//             {/*                    value={firstName}*/}
//             {/*                    onChange={firstNameInputChangeHandler}*/}
//             {/*                />*/}
//             {/*            </div>*/}
//             {/*            <div className={classes.control}>*/}
//             {/*                <label htmlFor='last name'>Please enter your last Name</label>*/}
//             {/*                <input*/}
//             {/*                    type="text"*/}
//             {/*                    placeholder={lastName}*/}
//             {/*                    name="last name"*/}
//             {/*                    className="form-control"*/}
//             {/*                    value={lastName}*/}
//             {/*                    onChange={lastNameInputChangeHandler}*/}
//             {/*                />*/}
//             {/*            </div>*/}
//             {/*            <div className={classes.control}>*/}
//             {/*                <label htmlFor='email'>Please enter your email address</label>*/}
//             {/*                <input*/}
//             {/*                    type="text"*/}
//             {/*                    placeholder={email}*/}
//             {/*                    name="email"*/}
//             {/*                    className="form-control"*/}
//             {/*                    value={email}*/}
//             {/*                    onChange={emailInputChangeHandler}*/}
//             {/*                />*/}
//             {/*            </div>*/}
//             {/*            <div className={classes.control}>*/}
//             {/*                <label htmlFor='mobile number'>Please enter your mobile number</label>*/}
//             {/*                <input*/}
//             {/*                    type="text"*/}
//             {/*                    placeholder={mobileNumber}*/}
//             {/*                    name="mobile number"*/}
//             {/*                    className="form-control"*/}
//             {/*                    value={mobileNumber}*/}
//             {/*                    onChange={mobileNumberInputChangeHandler}*/}
//             {/*                />*/}
//             {/*            </div>*/}
//             {/*            <div className={classes.actions}>*/}
//             {/*                <button*/}
//             {/*                    onClick={(event) => updatingParticipant(event)}*/}
//             {/*                >Submit</button>*/}
//             {/*            </div>*/}
//             {/*            /!*Tertiary statement displaying server error back to user*!/*/}
//             {/*            {error && <div className={classes.error}> {error} </div>}*/}
//             {/*        </div>*/}
//             {/*    </form>*/}
//             {/*</section>*/}
//         <div className={classes.photo}>
//             <img src={leafblower} alt="leafblower" height={600} width={580}/>
//         </div>
//         </Fragment>
//
//
//     );
// };
//
// export default IndividualDetails;

import React, {Fragment, useEffect, useState} from 'react';
import classes from './ProfileForm.module.css';
import {useHistory, useParams} from "react-router-dom";
import leafblower from "../../assets/pexels-pixabay-162564.jpg";
import ParticipantService from "../../services/ParticipantService";

//Here we will use route parameters to access individual participants
//Using "useParams", with "id" as key. Matches the ":id" key from the app component
//Displays the username back to the user in the welcome message to the user

const IndividualDetails = ({setFormS, firstName, setFirstName, lastName, setLastName, email,
                               setEmail, mobileNumber, setMobileNumber}) => {

    const { id } = useParams()

    const history = useHistory();

    const participant = {id, firstName, lastName, email, mobileNumber};

    console.log(id)
    console.log(firstName)
    console.log(lastName)
    console.log(email)
    console.log(mobileNumber)
    console.log(participant)

    if (id) {
        ParticipantService.updateParticipant(id, participant).then((response) => {
            console.log(response)
            // history.push(`/participant/${response.data.firstName}`)
        }).catch(error => {
            console.log(error)
            console.log(error.response.data)

        })

    }
    useEffect(() => {

        ParticipantService.getParticipantById(id).then((response) =>{
            console.log(response.data)
            // setFirstName(response.data.firstName)
            // setLastName(response.data.lastName)
            // setEmail(response.data.email)
        }).catch(error => {
            console.log(error)
            console.log(error.response.data)
        })
    },[]);


    return (
        <>
            <section className={classes.base} >
                <div>
                    <h2>Welcome {id}</h2>
                </div>


            </section>
            <div className={classes.photo}>
                <img src={leafblower} alt="leafblower" height={600} width={580}/>
            </div>
        </>


    );
};

export default IndividualDetails;