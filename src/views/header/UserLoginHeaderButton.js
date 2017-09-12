import React from 'react'
import PropTypes from 'prop-types'

const UserLoginHeaderButton = ({currentUser, onClickLogin, onClickAccount}) => {
  if (currentUser) {
    return (
      <div className="header__btn" onClick={onClickAccount}>
        <i className="mdi mdi-account"></i>
        {currentUser.username}
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

}

UserLoginHeaderButton.defaultProps = {

}

export default UserLoginHeaderButton;
