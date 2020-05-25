import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';
//import PrivateRoute from '../helpers/PrivateRoute'
import URL_REPO from './helpers/UrlRepo'

import { IonApp, IonPage, IonContent } from '@ionic/react';
// pages
import NotFound from './pages/NotFound/NotFound';
import MatchCreate from './pages/match/MatchCreate';
import MatchList from './pages/match/MatchList';
import StatCreate from './pages/stat/StatCreate';
import Menu from './components/Menu/Menu';
import Layout from './layout/Layout';
import UserLogin from './pages/user/UserLogin';
import Home from './pages/Home';

const Routes = () => (
    <IonApp>
        <IonPage id="main">
            <Menu />
            <Layout>
                <Switch>
                    <Route exact path={URL_REPO.ROOT} component={Home} />
                    <Route path={URL_REPO.USER_LOGIN} component={UserLogin} />
                    <Route path={URL_REPO.MATCH_CREATE} component={MatchCreate} />
                    <Route path={URL_REPO.MATCH_LIST} component={MatchList} />
                    <Route path={URL_REPO.STAT_ADD} component={StatCreate} />
                    <Route path={URL_REPO.NOTFOUND} component={NotFound} />
                </Switch>
            </Layout>
        </IonPage>
    </IonApp>

);

export default withCookies(Routes);
