import React from 'react'
import PropTypes from 'prop-types'

import ClickOutside from 'react-click-outside'

import nobFlag from 'assets/flag-nor.svg'
import deuFlag from 'assets/flag-deu.svg'

import _ from 'lodash'

import './FlagLanguageSelector.css'

export class FlagLanguageSelector extends React.Component {
  static propTypes = {
    lang: PropTypes.array,
    onLanguageToggle: PropTypes.func,
  }

  static defaultProps = {
    lang: [],
    onLanguageToggle: _.identity
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

  handleLanguageChange = (lang) => {
    this.setState({
      ...this.state,
      open: false
    })
    this.props.onLanguageToggle(lang)
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
      <ClickOutside onClickOutside={this.close}>
        <div className="flaglanguageselector">
          <img src={icon} alt="" onClick={this.handleOpen} />
          <ul className={"flaglanguageselector__submenu" + (open ? " open" : "")}>
            <li
                className={lang.includes('nob') ? 'active': ''}
                onClick={() => this.handleLanguageChange('nob')}>
              <img src={nobFlag} alt=""/>
              <span>Norwegian</span>
            </li>
            <li
                className={lang.includes('deu') ? 'active': ''}
                onClick={() => this.handleLanguageChange('deu')}>
              <img src={deuFlag} alt=""/>
              <span>German</span>
            </li>
          </ul>
        </div>
      </ClickOutside>
    )
  }
}

export default FlagLanguageSelector