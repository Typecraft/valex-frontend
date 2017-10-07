import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import LoginFull from 'views/login/LoginFull'

import LemmaOverview from 'views/lemmas/LemmaOverview'
import LemmaDetail from 'views/lemmas/LemmaDetail'
import LemmaDetailEdit from 'views/lemmas/LemmaDetailEdit'
import LemmaCreate from 'views/lemmas/LemmaCreate'

import MeaningOverview from 'views/meanings/MeaningOverview'
import MeaningDetail from 'views/meanings/MeaningDetail'
import MeaningDetailEdit from 'views/meanings/MeaningDetailEdit'
import MeaningCreate from 'views/meanings/MeaningCreate'

import MeaningValenceDetail from 'views/meaningvalences/MeaningValenceDetail'

import Dashboard from 'views/dashboard/Dashboard'

import Search from 'views/search/Search'
import UnderConstructionFull from 'views/generic/UnderConstructionFull'

import './Main.css'

export class Main extends React.Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  render = () =>
    <main className="main">
      <Switch>
        <Route exact path="/app" component={Dashboard} />
        <Redirect exact from="/" to="/app" />
        <Route path="/app/login" component={LoginFull} />
        <Route path="/app/lemmas/create" component={LemmaCreate} />
        <Route exact path="/app/lemmas/:lemmaId" component={LemmaDetail}/>
        <Route path="/app/lemmas/:lemmaId/edit" component={LemmaDetailEdit}/>
        <Route path="/app/lemmas" component={LemmaOverview} />
        <Route path="/app/meanings/create" component={MeaningCreate} />
        <Route exact path="/app/meanings/:meaningId" component={MeaningDetail}/>
        <Route path="/app/meanings/:meaningId/edit" component={MeaningDetailEdit}/>
        <Route path="/app/meanings" component={MeaningOverview} />
        <Route exact path="/app/meaning-valences/:meaningValenceId" component={MeaningValenceDetail}/>
        <Route path="/app/search" component={Search} />
        {/*<Route path="/app/meaning-valences/:meaningId/edit" component={MeaningDetailEdit}/>*/}
        <Route path="/" component={UnderConstructionFull} />
      </Switch>
    </main>
}

export default Main;
