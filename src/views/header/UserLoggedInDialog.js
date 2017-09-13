import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './UserLoggedInDialog.css'

const UserLoggedInDialog = ({open}) => (
  <div className={`userloggedindialog bg-white-1 ${open ? 'open' : ''}`}>
    <div className="valex-light-blue"><Link to="/app/contributions" className="resetlink"><i className="mdi mdi-json mr-15"></i>My contributions</Link></div>
    <div className="valex-light-blue"><Link to="/app/profile" className="resetlink"><i className="mdi mdi-account-settings mr-15"></i>Profile</Link></div>
    <div className="valex-light-blue"><Link to="/app/settings" className="resetlink"><i className="mdi mdi-settings mr-15"></i>Settings</Link></div>
    <div className="valex-light-blue"><a href="/logout" className="resetlink"><i className="mdi mdi-logout mr-15"></i>Logout</a></div>
  </div>
)

UserLoggedInDialog.propTypes = {

}

UserLoggedInDialog.defaultProps = {

}

export default UserLoggedInDialog;
