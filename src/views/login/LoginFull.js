import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import login from 'state/login'

import './LoginFull.css'

export class LoginFull extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  static propTypes = {
    loggedIn: PropTypes.bool,
    loggedInErrors: PropTypes.string
  }

  static defaultProps = {
    loggedIn: false
  }

  componentWillReceiveProps = (newProps) => {
    if (newProps.loggedIn) {
      this.props.history.push('/app')
    }
  }

  handleChangeUsername = event => {
    this.setState({
      ...this.state,
      username: event.target.value
    })
  }

  handleChangePassword = event => {
    this.setState({
      ...this.state,
      password: event.target.value
    })
  }

  handleSubmit = () => {
    this.props.attemptLogin(this.state.username, this.state.password)
  }

  handleKeyup = event => {
    if (event.key === 'Enter') {
      this.handleSubmit()
    }
  }

  componentDidMount = () => {
    window.addEventListener('keyup', this.handleKeyup)
  }

  componentWillUnmount = () => {
    window.removeEventListener('keyup', this.handleKeyup)
  }

  render = () =>
    <div className="loginfull">
      {!this.props.loggedIn ?   (
        <div className="loginfull__inner">
          <div className="login-form-wrapper">
            <div className="form-group mb-20">
              <label className="thin mb-5">Username</label>
              <input type="text" onChange={this.handleChangeUsername}/>
            </div>
            <div className="form-group mb-30">
              <label className="thin mb-5">Password</label>
              <input type="password" onChange={this.handleChangePassword}/>
            </div>
            <div className="form-group">
              <button className="block" onClick={this.handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
        ) : (
        <div className="loginfull__inner valex-purple">
          <div className="loginfull__smiley">
            ☺
          </div>
          <h2>You are logged in, enjoy!</h2>
          <div className="valex-form-control mt-40">
            <button className="block" onClick={this.props.attemptLogout}>Logout</button>
          </div>
        </div>
      )
    }
    </div>
}

function mapStateToProps(state) {
  return {
    loggedIn: login.selectors.getIsLoggedIn(state),
    loggedInErrors: login.selectors.getLoggedInErrors(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    attemptLogin: (username, password) => dispatch(login.actions.attemptLogin(username, password)),
    attemptLogout: () => dispatch(login.actions.attemptLogout()),
    dispatch
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginFull))
