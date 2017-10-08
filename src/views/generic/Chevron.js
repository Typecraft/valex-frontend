import React from 'react'
import PropTypes from 'prop-types'

import './Chevron.css'

export const Chevron = ({
  rotation='right',
  size=16,
  color='#4d4d4f',
  className='',
  style={}
}) => {
  let rotationInDeg = 0
  if (rotation.constructor !== String) {
    rotationInDeg = rotation
  } else {
    switch (rotation) {
      case 'right':
        rotationInDeg = -90
        break
      case 'up':
        rotationInDeg = 180
        break
      case 'left':
        rotationInDeg = 90
        break
      case 'down':
      default:
        rotationInDeg = 0
    }
  }

  return (
    <span
        className={`chevron chevron--${rotation}`}
        style={Object.assign(
          {
            color,
            fill: 'currentColor',
          },
          style
        )}>
      <svg transform={`rotate(${rotationInDeg})`} width={size} height={size} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.25 7.4">
          <title>chevron</title>
          <path d="M9.19,12.62l3.13-3.13h0L12.85,9,16,5.77a.27.27,0,1,0-.38-.38L13.13,7.92h0l-2.45,2.45h0L9,12,6.06,9.1h0l-.52-.52-3.2-3.2A.27.27,0,0,0,2,5.76L4.49,8.3l2.45,2.45h0l1.86,1.86h0a.27.27,0,0,0,.38,0" transform="translate(-1.88 -5.3)" />
      </svg>
    </span>
  )
}

Chevron.propTypes = {
  rotation: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
}

export default Chevron;
