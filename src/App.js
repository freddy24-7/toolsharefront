import {Switch, Route} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import RegisterPage from "./pages/RegisterPage";

function App() {

    return (
        <Layout>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={RegisterPage} />
            </Switch>
        </Layout>
    );
}

export default App;