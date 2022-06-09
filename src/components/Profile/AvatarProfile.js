import AvatarNameForm from "./AvatarNameForm";
import React, {useState} from "react";
import classes from './AvatarForm.module.css';

const AvatarProfile = () => {

    const [user, setUser] = useState({firstName: ""});
    const [error, setError] = useState("");

    const Display = (details) => {

        console.log(details);

        if (details.firstName) {
            console.log("Success");
            console.log(details)
            setUser({
                firstName: details.firstName,
            });
        } else {
            console.log("Failed");
            setError("Invalid Credentials");
        }
    }


    //Below a ternary operator is used to check if the user is logged in or not
    return (
        <div className={classes.actions}>
            {(user.firstName != "") ? (
                <div className={classes.actions}>
                    <h2>Welcome, <span>{user.firstName}</span></h2>
                </div>
            ) : (
                <AvatarNameForm Display={Display} />
            )}
        </div>
    );


}
export default AvatarProfile;











