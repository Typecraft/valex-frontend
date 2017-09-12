import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './LoginDialog.css'

export class LoginDialog extends React.Component {
  static propTypes = {
    open: PropTypes.bool
  }

  static defaultProps = {
    open: false
  }

  render = () =>
    <div className={`logindialog bg-valex-blue ${this.props.open ? 'open' : ''}`}>
      <div className="valex-form-control form-inline form-colors-inverse">
        <h3 className="logindialog__title light mb-15">Please enter your credentials</h3>
        <div className="form-group">
          <label>Username</label>
          <span className="form-icon"><i className="mdi mdi-account"></i></span>
          <input type="text" placeholder="Username" autoFocus/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <span className="form-icon"><i className="mdi mdi-lock"></i></span>
          <input type="password" placeholder="Password"/>
        </div>
        <div className="form-group">
          <label></label>
          <button>Submit</button>
        </div>
      </div>
    </div>
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog)
