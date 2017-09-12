import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './LoginDialog.css'

import login from 'state/login'

export class LoginDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  static propTypes = {
    open: PropTypes.bool
  }

  static defaultProps = {
    open: false
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
    <div className={`logindialog bg-valex-blue ${(this.props.open && !this.props.loggedIn) ? 'open' : ''}`}>
      <div className="valex-form-control form-inline form-colors-inverse">
        <h3 className="logindialog__title light mb-15">Please enter your credentials</h3>
        <div className="form-group">
          <label>Username</label>
          <span className="form-icon"><i className="mdi mdi-account"></i></span>
          <input type="text" placeholder="Username" autoFocus onChange={this.handleChangeUsername}/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <span className="form-icon"><i className="mdi mdi-lock"></i></span>
          <input type="password" placeholder="Password" onChange={this.handleChangePassword}/>
        </div>
        <div className="form-group">
          <label></label>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
}

function mapStateToProps(state) {
  return {
    loggedIn: login.selectors.getIsLoggedIn(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    attemptLogin: (username, password) => dispatch(login.actions.attemptLogin(username, password)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog)
