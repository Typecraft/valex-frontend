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

}

ExampleLargeInline.defaultProps = {

}

export default ExampleLargeInline;
