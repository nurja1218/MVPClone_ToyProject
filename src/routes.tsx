import { Route, Redirect, Switch } from 'react-router-dom';
/**
 * Routes
 */
import MainPage from './view/pages/MainPage';
import ControlPage from './view/pages/ControlPage';
import LoginPage from './view/pages/LoginPage';
import UserPage from './view/pages/UserPage';
import SettingsPage from './view/pages/SettingsPage';
import TransportPage from './view/pages/TransportPage';

// 디테일페이지는 해당 route 위에 위치해야한다.
export function RoutesForNewUser() {
    return (
        <Switch>
            <Route path="/login" component={LoginPage} />
            <Redirect to="/login" />
        </Switch>
    );
}
export function RoutesForCompanyUser() {
    return (
        <Switch>
            <Route path="/main" component={MainPage} />
            <Route path="/control" component={ControlPage} />
            <Route path="/transport" component={TransportPage} />
            <Route path="/user" component={UserPage} />
            <Route path="/settings" component={SettingsPage} />
            <Redirect to="/main" />
        </Switch>
    );
}