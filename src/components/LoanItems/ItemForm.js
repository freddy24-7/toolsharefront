import React, {Fragment, useContext, useState} from 'react';
import AuthContext from "../../context/auth-context";
import classes from "../LoanItems/ItemForm.module.css";
import machineworker from "../../assets/pexels-karolina-grabowska-6920104.jpg";


const ItemForm = () => {

    //Defining the variables for uploading new item
    const [id, setId] = useState(null);
    const [itemName, setItemName] = useState('')
    const [itemDescription, setItemDescription] = useState('')

    //Creating the variable that will be used to send data to backend
    const loanItem = { id, itemName, itemDescription}

    //Error-handling
    const [error, setError] = useState(null);
    //Constant for dynamic CSS display
    const [errorCSS, setErrorCSS] = useState(false);

    //Using useContext to manage the login-state
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    //This variable is further worked on in child components through props
    const [formS, setFormS]= useState(false);

    //This edit-submission variable is further worked on in child components through props
    const [editS, setEditS]= useState(false);

    //Dynamic use of CSS, other styles appear if input is invalid
    const inputClasses = errorCSS
        ? classes.invalid
        : classes.base;

    return (

        <div>
            <p>
                Hello World
            </p>
        </div>

        // <Fragment>
        //     <section className={inputClasses}>
        //         <div>Welcome!
        //             <br/>
        //             <br/>
        //             Please add some more details to get started
        //             <br/>
        //             <br/>
        //             Please start with adding your photo.
        //             Choose file, press submit, then type any key in the next line (FILE URL)
        //         </div>
        //     {/*    <div className={classes.photo}>*/}
        //     {/*        <form onSubmit={handleSubmit(onSubmit)} >*/}
        //     {/*            <input type="file" {...register("file")} />*/}
        //     {/*            <input type="submit" className={classes.submit}/>*/}
        //     {/*        </form>*/}
        //     {/*    </div>*/}
        //     {/*    <form onSubmit={submitHandler} key={item.id}>*/}
        //     {/*        <div className={classes.click}>*/}
        //     {/*            <div className={classes.control}>*/}
        //     {/*                <label htmlFor='File URL'>File URL</label>*/}
        //     {/*                <input*/}
        //     {/*                    type="url"*/}
        //     {/*                    placeholder="Click, then type any key to upload"*/}
        //     {/*                    name="url"*/}
        //     {/*                    className="form-control"*/}
        //     {/*                    value={photoURL}*/}
        //     {/*                    onChange={URLChangeHandler}*/}
        //     {/*                />*/}
        //     {/*            </div>*/}
        //     {/*            <div className={classes.control}>*/}
        //     {/*                <label htmlFor='first name'>Please enter your first name</label>*/}
        //     {/*                <input*/}
        //     {/*                    type="text"*/}
        //     {/*                    placeholder="First Name"*/}
        //     {/*                    name="firstName"*/}
        //     {/*                    className="form-control"*/}
        //     {/*                    value={firstName}*/}
        //     {/*                    onChange={firstNameInputChangeHandler}*/}
        //     {/*                />*/}
        //     {/*            </div>*/}
        //     {/*            <div className={classes.control}>*/}
        //     {/*                <label htmlFor='last name'>Please enter your last Name</label>*/}
        //     {/*                <input*/}
        //     {/*                    type="text"*/}
        //     {/*                    placeholder="Last Name"*/}
        //     {/*                    name="last name"*/}
        //     {/*                    className="form-control"*/}
        //     {/*                    value={lastName}*/}
        //     {/*                    onChange={lastNameInputChangeHandler}*/}
        //     {/*                />*/}
        //     {/*            </div>*/}
        //     {/*            <div className={classes.control}>*/}
        //     {/*                <label htmlFor='email'>Please enter your email address</label>*/}
        //     {/*                <input*/}
        //     {/*                    type="text"*/}
        //     {/*                    placeholder="Email"*/}
        //     {/*                    name="email"*/}
        //     {/*                    className="form-control"*/}
        //     {/*                    value={email}*/}
        //     {/*                    onChange={emailInputChangeHandler}*/}
        //     {/*                />*/}
        //     {/*            </div>*/}
        //     {/*            <div className={classes.control}>*/}
        //     {/*                <label htmlFor='mobile number'>Please enter your mobile number</label>*/}
        //     {/*                <input*/}
        //     {/*                    type="text"*/}
        //     {/*                    placeholder="Mobile Number"*/}
        //     {/*                    name="mobile number"*/}
        //     {/*                    className="form-control"*/}
        //     {/*                    value={mobileNumber}*/}
        //     {/*                    onChange={mobileNumberInputChangeHandler}*/}
        //     {/*                />*/}
        //     {/*            </div>*/}
        //     {/*            <div className={classes.actions}>*/}
        //     {/*                <button*/}
        //     {/*                    className={classes.button}*/}
        //     {/*                    onClick={(event) => submitHandler(event)}*/}
        //     {/*                >Submit</button>*/}
        //     {/*            </div>*/}
        //     {/*            /!*Terniary statement displaying server error back to user*!/*/}
        //     {/*            {error && <div className={classes.error}> {error} </div>}*/}
        //     {/*        </div>*/}
        //     {/*    </form>*/}
        //     </section>
        //     <div className={classes.photo}>
        //         <img src={machineworker} alt="machineworker" height={300} width={300}/>
        //     </div>
        //
        // </Fragment>
    );
}




export default ItemForm;