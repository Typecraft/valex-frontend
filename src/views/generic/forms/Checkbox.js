import React from 'react'
import PropTypes from 'prop-types'

import './Checkbox.css'

export const Checkbox = ({
  style,
  className,
  id,
  label,
  defaultChecked,
  checked,
  onChange=x => x
}) => (
  <span className="checkbox">
    <input checked={checked} type="checkbox" id={id} name={id} defaultChecked={defaultChecked} onChange={onChange} />
    <label htmlFor={id}>
      <span className="checkbox__box"></span>
      <span className="checkbox__label">{label}</span>
    </label>
  </span>
)

Checkbox.propTypes = {
  onChange: PropTypes.func
}

export default Checkbox;
