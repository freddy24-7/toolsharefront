import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AuthContext from './context/auth-context';

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
                        <AuthPage />
                    </Route>
                )}
                {!authCtx.isLoggedIn && (
                    <Route path='/register'>
                        <RegisterPage />
                    </Route>)}
                <Route path='/profile' exact>
                    {authCtx.isLoggedIn && <ProfilePage /> }
                    {!authCtx.isLoggedIn && <Redirect to='/login' />}
                </Route>
                <Route path='*'>
                    <Redirect to='/' />
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;