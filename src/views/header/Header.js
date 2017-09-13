import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import users from 'state/users'

import './Header.css'

import UserLoginHeaderButton from './UserLoginHeaderButton'
import LoginDialog from 'views/login/LoginDialog'

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginDialogOpen: false
    }
  }

  static propTypes = {
    currentUser: PropTypes.object
  }

  static defaultProps = {

  }

  handleUserLoginClicked = () => {
    console.log('he');
    this.setState({
      ...this.state,
      loginDialogOpen: !this.state.loginDialogOpen
    })
  }

  handleUserAccountClicked = () => {
    this.setState()
  }

  render = () =>
    <div className="header bg-valex-blue">
      <div className="header__left">
        <div className="header__btn">
          <h1 className="light valex-highlight-blue">Valex</h1>
        </div>
      <div className="header__middle">
        <HeaderNav />
      </div>
      <div className="header__right">
        {/*<div className="header__btn mr-20">
          <i className="mdi mdi-bell"></i>
          Notifications
          <a className="ml-5 badge bg-valex-purple valex-lighter-purple">0</a>
        </div>*/}
        <UserLoginHeaderButton
            currentUser={this.props.currentUser}
            onClickLogin={this.handleUserLoginClicked} />
        <LoginDialog currentUser={this.props.currentUser} open={this.state.loginDialogOpen} />
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
