import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Switch, Route, Redirect } from 'react-router-dom'

import LemmaDetail from 'views/lemmas/LemmaDetail'

import StaffRequired from 'views/login/StaffRequired'
import Dashboard from './Dashboard'

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
        <Route path="/app/lemmas/:lemmaId" component={LemmaDetail}/>
      </Switch>
    </main>
}

export default Main;
