import React from 'react'
import PropTypes from 'prop-types'

import './ExampleLargeInline.css'

export const ExampleLargeInline = ({
  className,
  style,
  example
}) => (
  <div className={"examplelargeinline " + className}>
    {example.text}
  </div>
)

ExampleLargeInline.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  example: PropTypes.object
}

ExampleLargeInline.defaultProps = {
  example: {
    text: "Loading..."
  }
}

export default ExampleLargeInline;
