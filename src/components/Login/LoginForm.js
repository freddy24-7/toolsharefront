//May be redundat - compare to authform

// import React, { useState } from "react";
// import {Redirect, useHistory} from "react-router-dom";
// import AuthenticationService from "../../services/AuthenticationService";
//
//
// const Login = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//
//     const history = useHistory();
//
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             await AuthenticationService.login(username, password).then(
//                 () => {
//                     history.push("/");
//                     window.location.reload();
//                 },
//                 (error) => {
//                     console.log(error);
//                 }
//             );
//         } catch (err) {
//             console.log(err);
//         }
//     };
//
//     return (
//         <div>
//             <form onSubmit={handleLogin}>
//                 <h3>Login</h3>
//                 <input
//                     type="text"
//                     placeholder="username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button type="submit">Log in</button>
//             </form>
//         </div>
//     );
// };
//
// export default Login;