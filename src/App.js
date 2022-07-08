import {Fragment, useContext} from 'react';
import {Switch, Route, Redirect, useParams} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from "./pages/RegisterPage";
import AuthContext from './context/auth-context';
import {useState} from "react";
import ConfirmationScreen from "./components/Profile/ConfirmationScreen";
import {useEffect} from "react";

function App() {
    const authCtx = useContext(AuthContext);

    useEffect(()=> {
        const data = localStorage.getItem('submission');
        if (data) {
            setFormS(JSON.parse(data))
        }
    },[]);

    useEffect(() => {
        localStorage.setItem("submission", JSON.stringify(formS));
    });

    //This variable is further worked on in child components through props
    const [formS, setFormS]= useState(false);

    //
    const { id } = useParams();

    return (
        <Fragment>
            <Layout
                formS={formS}
                setFormS={setFormS}
                id={id}
            />
        <Layout>
            <Switch>
                {!authCtx.isLoggedIn && (
                    <Route path='/login'component={LoginPage}>
                    </Route>
                )}
                {!authCtx.isLoggedIn && (
                    <Route path='/register' component={RegisterPage}>
                    </Route>)}
                {/*{authCtx.isLoggedIn && (*/}
                {/*    <Route path='/participant/:id/' exact*/}
                {/*           component={ProfileForm}*/}
                {/*    >*/}
                {/*        {!authCtx.isLoggedIn && <Redirect to='/login' />}*/}
                {/*    </Route>)}*/}
                {(authCtx.isLoggedIn && formS) ?
                    <Route path='/participant/confirm/:id' component={ConfirmationScreen}>
                        {!authCtx.isLoggedIn && <Redirect to='/login'/>}
                    </Route>
                    : null
                }
                {!authCtx.isLoggedIn && (
                    <Route exact path='/' component={HomePage}>
                    </Route>
                )}

                {/*<Route path='*'>*/}
                {/*    <Redirect to='/' />*/}
                {/*</Route>*/}
            </Switch>
        </Layout>
        </Fragment>
    );
}

export default App;