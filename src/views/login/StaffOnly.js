import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import login from 'state/login'
import users from 'state/users'


export class StaffOnly extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    loggedIn: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object
  }

  static defaultProps = {
    className: "",
    style: {}
  }

  render = () => {
    if (this.props.loggedIn && this.props.currentUser && this.props.currentUser.is_staff) {
      return (
        <div className={`staffonly ${this.props.className}`} style={this.props.style}>
          {this.props.children}
        </div>
      )
    }
    return null
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

export default connect(mapStateToProps, mapDispatchToProps)(StaffOnly)
