import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import users from 'state/users'

import { Link } from 'react-router-dom'
import { Grid, Row, Col } from 'react-flexbox-grid'

import UserLoginHeaderButton from './UserLoginHeaderButton'
import LoginDialog from 'views/login/LoginDialog'
import UserLoggedInDialog from './UserLoggedInDialog'
import HeaderNav from './HeaderNav'

import './Header.css'

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginDialogOpen: false,
      loggedInDialogOpen: false
    }
  }

  static propTypes = {
    currentUser: PropTypes.object
  }

  static defaultProps = {

  }

  handleUserLoginClicked = () => {
    this.setState({
      ...this.state,
      loginDialogOpen: !this.state.loginDialogOpen
    })
  }

  handleUserAccountClicked = () => {
    this.setState({
      ...this.state,
      loggedInDialogOpen: !this.state.loggedInDialogOpen
    })
  }

  render = () =>
    <div className="header__wrapper">
      <Grid className="header thin">
        <div className="header__left">
          <div className="header__btn">
            <Link className="resetlink" to="/app/">
              <h1 className="thin">Valex</h1>
            </Link>
          </div>
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
          {this.props.currentUser === undefined ?
            [
              <Link className="resetlink header__btn" to="/app/login">Sign in</Link>,
              <Link className="resetlink header__btn" to="/app/register">Register</Link>
            ] : <span>{this.props.currentUser.name}</span>

          }
        </div>
      </Grid>
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
