import React from 'react'
import PropTypes from 'prop-types'

import { ThreeBounce } from 'better-react-spinkit'

const Loader = ({size}) => (
  <ThreeBounce size={size} />
)

Loader.propTypes = {
  size: PropTypes.number
}

Loader.defaultProps = {
  size: 30
}

export default Loader;
