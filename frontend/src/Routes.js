import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';
//import PrivateRoute from '../helpers/PrivateRoute'
import URL_REPO from './helpers/UrlRepo'

import { IonApp, IonPage, IonContent } from '@ionic/react';
// pages
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';
import MatchCreate from './pages/match/MatchCreate';
import MatchList from './pages/match/MatchList';
import StatCreate from './pages/stat/StatCreate';
import Menu from './components/Menu/Menu';

const Routes = () => (
    <IonApp>
        <IonPage id="main">
            <Menu />
            <IonContent>
                <Switch>
                    <Route exact path={URL_REPO.ROOT} component={Home} />
                    <Route path={URL_REPO.DASHBOARD} component={Dashboard} />
                    <Route path={URL_REPO.MATCH_CREATE} component={MatchCreate} />
                    <Route path={URL_REPO.MATCH_LIST} component={MatchList} />
                    <Route path={URL_REPO.STAT_ADD} component={StatCreate} />
                    <Route path={URL_REPO.NOTFOUND} component={NotFound} />
                </Switch>
            </IonContent>
        </IonPage>
    </IonApp>

);

export default withCookies(Routes);
