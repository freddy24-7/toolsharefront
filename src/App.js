import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LayoutWrapper from './components/Layout/LayoutWrapper';
import LoginPage from './startPages/LoginPage';
import HomePage from './startPages/HomePage';
import RegisterPage from "./startPages/RegisterPage";
import AuthContext from './context/auth-context';

function App() {
    //These variable manages the security set up for the whole application (JWT)
    const authCtx = useContext(AuthContext);

    return (
        //The code in the LayoutWrapper component encapsulates the whole application
        <LayoutWrapper>
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
                <Route path='*'>
                    <Redirect to='/' />
                </Route>
            </Switch>
        </LayoutWrapper>
    );
}

export default App;