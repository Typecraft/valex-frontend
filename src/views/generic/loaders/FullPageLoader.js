import React from 'react'
import PropTypes from 'prop-types'

import Loader from './Loader'

import './FullPageLoader.css'

const FullPageLoader = () => (
  <div className="fullpageloader">
    <Loader />
  </div>
)

FullPageLoader.propTypes = {

}

FullPageLoader.defaultProps = {

}

export default FullPageLoader;
