import React from 'react'
import PropTypes from 'prop-types'

const UserLoginHeaderButton = ({currentUser, onClickLogin, onClickAccount}) => {
  if (currentUser) {
    return (
      <div className="header__btn" onClick={onClickAccount}>
        <i className="mdi mdi-account"></i>
        {currentUser.first_name || currentUser.username || "Anonymous user"}
      </div>
    )
  } else {
    return (
      <div className="header__btn" onClick={onClickLogin}>
        <i className="mdi mdi-account"></i>
        Login
      </div>
    )
  }
}

UserLoginHeaderButton.propTypes = {
  currentUser: PropTypes.object,
  onClickLogin: PropTypes.func,
  onClickAccount: PropTypes.func
}

UserLoginHeaderButton.defaultProps = {
}

export default UserLoginHeaderButton;
