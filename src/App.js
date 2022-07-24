import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from "./pages/RegisterPage";
import AuthContext from './context/auth-context';
import IndividualDetails from "./components/Profile/IndividualDetails";
import ConfirmationScreen from "./components/Profile/ConfirmationScreen";
import ProfileForm from "./components/Profile/ProfileForm";
import ParticipantList from "./components/Profile/ParticipantList";

function App() {
    const authCtx = useContext(AuthContext);

    return (
        <Layout>
            <Switch>
                {!authCtx.isLoggedIn && (
                    <Route path='/login'component={LoginPage}>
                    </Route>
                )}
                {!authCtx.isLoggedIn && (
                    <Route path='/register' component={RegisterPage}>
                    </Route>)}

                {!authCtx.isLoggedIn && (
                    <Route exact path='/' component={HomePage}>
                    </Route>
                )}
                {/*<Route path='*'>*/}
                {/*    <Redirect to='/' />*/}
                {/*</Route>*/}
            </Switch>
        </Layout>
    );
}

export default App;