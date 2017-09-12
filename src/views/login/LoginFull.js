import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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

  }

  static defaultProps = {

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

  render = () =>
    <div className="loginfull">
      {!this.props.loggedIn ? (
        <div className="loginfull__inner">
          <h2 className="normal mb-15">Please enter your credentials</h2>
          <div className="valex-form-control">
            <div className="form-group mb-20">
              <label>Username</label>
              <span className="form-icon">
                <i className="mdi mdi-account"></i>
              </span>
              <input type="text" placeholder="Username" onChange={this.handleChangeUsername}/>
            </div>
            <div className="form-group mb-20">
              <label>Password</label>
              <span className="form-icon">
                <i className="mdi mdi-lock"></i>
              </span>
              <input type="password" placeholder="Password" onChange={this.handleChangePassword}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginFull)
