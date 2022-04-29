import {useEffect, useState} from 'react';
import axios from 'axios';
import {authHeaders} from '../../store/auth-helper';
import {USER_LIST_URL} from "../../backend-urls/constants";

const ProfileList = () => {

    //TODO - CSS
    //TODO - add cards for each user
    //TODO - get user by ID
    //TODO - Implement Role based access control

    const [user, setUser] = useState([]);
    const getData = async () => {

        try {
            const response = await axios(USER_LIST_URL, authHeaders);
            console.log(response.data);
            setUser(response.data);
            console.log(user);
        } catch (error) {
            console.log(error.response);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
        <h2>List of users</h2>
            <p>
                {user.map(user => (
                    <div key={user.id}>
                        <h3>{user.username}</h3>
                    </div>
                ))}
            </p>
        </div>
);
};


//TODO - below code is draft code for getUserById
//const {id} = useParams();
    // const history = useHistory();
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    // let [user, setUser] = useState('')
    //
    // const authCtx = useContext(AuthContext);
    //
    // useEffect(() => {
    //     if (id) {
    //         ProfileService.getUserById(id)
    //             .then(response => {
    //                 const data = response.data;
    //                 setUser = {
    //                     token: data.token,
    //                     username: data.username,
    //                     password: data.password,
    //                 };
    //                 authCtx.getUserById(user).then(() => {
    //                     history.push('/profile');
    //                 });
    //             })
    //             .catch(err => console.log(err))
    //     }
    // }, [id]);


export default ProfileList;