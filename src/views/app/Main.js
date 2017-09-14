import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import LemmaOverview from 'views/lemmas/LemmaOverview'
import LemmaDetail from 'views/lemmas/LemmaDetail'
import LemmaDetailEdit from 'views/lemmas/LemmaDetailEdit'
import LemmaCreate from 'views/lemmas/LemmaCreate'

import Dashboard from './Dashboard'
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
        <Route path="/app/lemmas/create" component={LemmaCreate} />
        <Route exact path="/app/lemmas/:lemmaId" component={LemmaDetail}/>
        <Route path="/app/lemmas/:lemmaId/edit" component={LemmaDetailEdit}/>
        <Route path="/app/lemmas" component={LemmaOverview} />
        <Route path="/" component={UnderConstructionFull} />
      </Switch>
    </main>
}

export default Main;
