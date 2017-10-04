import React from 'react'
import PropTypes from 'prop-types'

import './DashboardContact.css'

export const DashboardContact = ({onContact}) => (
  <div className="dashboardcontact">
    <h2 className="light valex-orange">Contact</h2>
    <p className="gray">Got some questions for us? Fill out the form below and fire away!</p>
    <div className="valex-form-control form-colors-inverse">
      <div className="form-group">
        <div className="valex-orange">Message</div>
        <textarea name="message" id="" rows="4"></textarea>
      </div>
      <div className="form-group">
        <span className="form-icon">
          <i className="mdi mdi-account"></i>
        </span>
        <input type="text" placeholder="Your full name"/>
      </div>
      <div className="form-group">
        <span className="form-icon">
          <i className="mdi mdi-email"></i>
        </span>
        <input type="text" placeholder="Email"/>
      </div>
      <div className="form-group">
        <button className="bg-valex-orange white">Send <i className="mdi mdi-send"></i></button>
      </div>
    </div>
  </div>
)

DashboardContact.propTypes = {
  onContact: PropTypes.func
}

DashboardContact.defaultProps = {
  onContact: x => x
}

export default DashboardContact;
