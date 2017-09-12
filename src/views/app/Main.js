import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Switch, Route } from 'react-router-dom'

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
        <Route path="/" component={Dashboard} />
      </Switch>
    </main>
}

export default Main;
