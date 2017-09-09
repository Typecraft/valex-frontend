

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import users from 'state/users'

import './Header.css'

export class Header extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object
  }

  static defaultProps = {

  }

  render = () =>
    <div className="header bg-valex-blue">
      <div className="header__left">
        <div className="header__btn">
          <h1 className="light valex-highlight-blue">Valex</h1>
        </div>
      </div>
      <div className="header__right">
        <div className="header__btn mr-20">
          <i className="mdi mdi-bell"></i>
          Notifications
          <a className="ml-5 badge bg-valex-purple valex-lighter-purple">0</a>
        </div>
        <div className="header__btn">
          {this.props.currentUser === undefined ?
            (<span><i className="mdi mdi-account"></i>Login</span>) :
            (<span><i className="mdi mdi-account"></i>{this.props.currentUser.username}</span>)
          }
        </div>
      </div>
    </div>
}

function mapStateToProps(state) {
  return {
    currentUser: users.selectors.getCurrentUser(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
