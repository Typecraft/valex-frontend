import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ClickOutside from 'react-click-outside'

import nobFlag from 'assets/flag-nor.svg'
import deuFlag from 'assets/flag-deu.svg'

import './FlagLanguageSelector.css'

export class FlagLanguageSelector extends React.Component {
  static propTypes = {
    lang: PropTypes.array,
    onLanguageSelect: PropTypes.func,
  }

  static defaultProps = {
    lang: []
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleOpen = () => {
    this.setState({
      open: !this.state.open
    })
  }

  close = () => {
    this.setState({
      ...this.state,
      open: false
    })
  }

  render = () => {
    const {
      lang,
    } = this.props

    const {
      open
    } = this.state

    const icon = lang.includes('nob') ?
        nobFlag : deuFlag
    return (
      <div className="flaglanguageselector">
        <img src={icon} alt="" onClick={this.handleOpen} />
        <ul className={"flaglanguageselector__submenu" + (open ? " open" : "")}>
          <li><img src={nobFlag} alt=""/><span>Norwegian</span></li>
          <li><img src={deuFlag} alt=""/><span>German</span></li>
        </ul>
      </div>
    )
  }
}

export default FlagLanguageSelector