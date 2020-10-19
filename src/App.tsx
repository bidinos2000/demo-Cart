import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/menu/navbar/Navbar';
import routers from './routes';

const App = () => {
    const getContent = () => {
        var result = null;
        if(routers.length > 0) {
            result = routers.map((router, index) => {
                return (
                    <Route 
                        key={index}
                        path={router.path}
                        exact={router.exact}
                        component={router.main}
                    />
                );
            });
        }
        return <Switch>{result}</Switch>;
    }

    return (
        <React.Fragment>
            <Router>
                <Navbar />
                {getContent()}
            </Router>
        </React.Fragment>
    );
}

export default App;
