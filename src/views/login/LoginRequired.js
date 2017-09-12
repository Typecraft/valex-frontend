import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import login from 'state/login'

import LoginFull from './LoginFull'

import './LoginRequired.css'

export class LoginRequired extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    loggedIn: PropTypes.bool
  }

  static defaultProps = {

  }

  render = () => {
    if (this.props.loggedIn) {
      return (
        <div className="loginrequired loginrequired__authorized">
          {this.props.children}
        </div>
      )
    } else {
      return (
        <div className="loginrequired loginrequired__unauthorized">
          <LoginFull />
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: login.selectors.getIsLoggedIn(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRequired)
