import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LoginFull from 'views/login/LoginFull'

import './Main.css'

export class Main extends React.Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  render = () =>
    <main className="main">
      <LoginFull />
    </main>
}

export default Main;
