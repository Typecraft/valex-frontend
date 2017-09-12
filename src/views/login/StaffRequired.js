import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import login from 'state/login'
import users from 'state/users'

import LoginFull from './LoginFull'

import './StaffRequired.css'

export class StaffRequired extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    loggedIn: PropTypes.bool
  }

  static defaultProps = {

  }

  render = () => {
    if (!this.props.loggedIn) {
      return (
        <div className="staffrequired staffrequired__login">
          <LoginFull />
        </div>
      )
    } else if (!this.props.currentUser || !this.props.currentUser.is_staff) {
      return (
        <div className="staffrequired staffrequired__unauthorized">
          <div className="staffrequired__inner">
            <span role="img" className="huge valex-purple" aria-label="Sadface">😞</span>
            <h3 className="valex-purple">You do not have sufficient permissions to access this page</h3>
          </div>
        </div>
      )
    } else {
      return (
        <div className="staffrequired staffrequired__authorized">
          {this.props.children}
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: login.selectors.getIsLoggedIn(state),
    currentUser: users.selectors.getCurrentUser(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffRequired)