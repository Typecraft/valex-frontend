import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

export class Keydown extends React.Component {
  static propTypes = {
    keys: PropTypes.array,
    keyPatterns: PropTypes.array,
    scopes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    onKey: PropTypes.func
  }

  static defaultProps = {
    keys: [],
    keyPatterns: [],
    onKeyDown: _.identity
  }

  _overloadScopes(scopes) {
    if (!scopes) {
      return ['keyup']
    }
    if (scopes.constructor === String) {
      return scopes.split(',')
    } else if (scopes.constructor === Array) {
      return scopes
    } else {
      return ['keyup']
    }
  }

  _keyPatternMatches(event, keyPattern) {
    if (!keyPattern || keyPattern.constructor !== String) {
      return false
    }
    const patternSplit = keyPattern.split("+")
    const patternLength = patternSplit.length
    const modifiers = patternSplit.slice(0, patternLength-2)
    const allModifiersMatch = modifiers.reduce((acc, mod) => acc && event[mod + 'Key'], true)
    if (!allModifiersMatch) {
      return false
    }
    const key = patternSplit[patternLength-1]
    return event.key === key || event.keyCode === key || event.code === key
  }

  componentDidMount = () => {
    const scopes = this._overloadScopes(this.props.scopes)

    if (scopes.includes('keyup')) {
      window.addEventListener('keyup', this.handleKeyEvent)
    }

    if (scopes.includes('keydown')) {
      window.addEventListener('keydown', this.handleKeyEvent)
    }

    if (scopes.includes('keypress')) {
      window.addEventListener('keypress', this.handleKeyEvent)
    }
  }

  componentWillUnmount = () => {
    const scopes = this._overloadScopes(this.props.scopes)

    if (scopes.includes('keyup')) {
      window.removeEventListener('keyup', this.handleKeyEvent)
    }

    if (scopes.includes('keydown')) {
      window.removeEventListener('keydown', this.handleKeyEvent)
    }

    if (scopes.includes('keypress')) {
      window.removeEventListener('keypress', this.handleKeyEvent)
    }
  }

  handleKeyEvent = (event) => {
    const {
      keys,
      keyPatterns,
      onKey
    } = this.props

    keys.forEach(key => {
      if (event.key === key || event.keyCode === key || event.code === key) {
        onKey(event, key)
      }
    })

    keyPatterns.forEach(key => {
      if (this._keyPatternMatches(event, key)) {
        onKey(event, key)
      }
    })
  }

  render = () => {
    const {
      children
    } = this.props
    const childElement = React.Children.only(children)
    return childElement
  }
}

export default Keydown
