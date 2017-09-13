import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import login from 'state/login'

export class LoginOnly extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    loggedIn: PropTypes.bool,
    className: PropTypes.string
  }

  static defaultProps = {

  }

  render = () => {
    if (this.props.loggedIn) {
      return (
        <div className={`loginonly ${this.props.className}`}>
          {this.props.children}
        </div>
      )
    }
    return null
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginOnly)
