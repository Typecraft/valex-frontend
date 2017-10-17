import React from 'react'
import PropTypes from 'prop-types'
import searchIcon from 'assets/search-gray.svg'

import './LexiconMobile.css'

import FlagLanguageSelector from './FlagLanguageSelector'

export class LexiconMobile extends React.Component {
  static propTypes = {
    lemmas: PropTypes.array,
    currentPage: PropTypes.object,
    char: PropTypes.string,
    page: PropTypes.string,
    lang: PropTypes.array
  }

  render() {
    return (
      <div className="lexiconmobile">
        <div className="lexicon__search">
          <input type="text"/>
          <img src={searchIcon} alt=""/>
          <FlagLanguageSelector />
        </div>
        <div className="lexiconmobile__main">
          {this.props.lemmas.map(lemma => (
            <div>{lemma.lemma}</div>
          ))}
        </div>
      </div>
    )
  }
}

LexiconMobile.propTypes = {

}

LexiconMobile.defaultProps = {

}

export default LexiconMobile;

