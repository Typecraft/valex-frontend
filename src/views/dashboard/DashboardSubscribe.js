import React from 'react'
import PropTypes from 'prop-types'

import './DashboardSubscribe.css'

export const DashboardSubscribe = ({onSubscribe}) => (
  <div className="dashboardsubscribe">
    <h2 className="light valex-orange">Subscribe</h2>
    <p className="gray">Enter your email below to subscribe to updates and changes to Valex.</p>
    <div className="valex-form-control mt-neg-10">
      <div className="form-group">
        <div className="valex-orange">Email</div>
        <span className="form-icon">
          <i className="mdi mdi-email"></i>
        </span>
        <input type="text" placeholder="Email"/>
      </div>
      <div className="form-group">
        <button className="bg-valex-orange">Subscribe <i className="mdi mdi-rss"></i></button>
      </div>
    </div>
  </div>
)

DashboardSubscribe.propTypes = {
  onSubscribe: PropTypes.func
}

DashboardSubscribe.defaultProps = {
  onSubscribe: x => x
}

export default DashboardSubscribe;
