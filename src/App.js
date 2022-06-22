import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from "./pages/RegisterPage";
import IndividualProfileDetails from "./components/Profile/IndividualProfileDetails";
import AuthContext from './context/auth-context';
import ProfileForm from "./components/Profile/ProfileForm";

function App() {
    const authCtx = useContext(AuthContext);

    return (
        <Layout>
            <Switch>
                <Route path='/' exact>
                    <HomePage />
                </Route>
                {!authCtx.isLoggedIn && (
                    <Route path='/login'>
                        <LoginPage />
                    </Route>
                )}
                {!authCtx.isLoggedIn && (
                    <Route path='/register'>
                        <RegisterPage />
                    </Route>)}
                <Route path='/profile' exact>
                    {!authCtx.isLoggedIn && <ProfileForm/> }
                </Route>
                {authCtx.isLoggedIn && (
                    <Route path='/profile/:id'>
                        <IndividualProfileDetails /> }
                        {!authCtx.isLoggedIn && <Redirect to='/login' />}
                    </Route>)}
                <Route path='*'>
                    <Redirect to='/' />
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;