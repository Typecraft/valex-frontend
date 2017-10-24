import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import _ from 'lodash'
import queryString from 'query-string'

import lemmas from 'state/lemmas'
import searchIcon from 'assets/search-gray.svg'

import './LexiconMobile.css'

import FlagLanguageSelector from './FlagLanguageSelector'
import ScrollAlphabetPaginator from 'views/pagination/ScrollAlphabetPaginator'
import Keydown from 'views/generic/Keydown'

export class LexiconMobile extends React.Component {
  static propTypes = {
    lemmas: PropTypes.array,
    currentPage: PropTypes.object,
    char: PropTypes.string,
    page: PropTypes.string,
    lang: PropTypes.array,
    onChangePage: PropTypes.func
  }

  static defaultProps = {
    onChangePage: _.identity
  }

  componentDidMount = () => {
    this.props.changePage(1, this.props.char, this.props.lang)
  }

  handleLetterChange = (newChar) => {
    const {
      lang
    } = this.props
    this.props.changePage(1, newChar, lang)
  }

  handleLanguageChange = (language) => {
    const {
      char,
      lang
    } = this.props
    let newLang

    if (lang.includes(language)) {
      newLang = lang.filter(x => x !== language)
    } else {
      newLang = lang.concat(language)
    }
    if (newLang.length === 0) {
      newLang = ['none']
    } else {
      newLang = newLang.filter(x => x !== 'none')
    }
    this.props.changePage(1, char, newLang.join(","))
  }

  handlePageChange = (newPage) => {
    if (!newPage) {
      newPage = this.props.page + 1
    }

    const {
      char,
      lang
    } = this.props

    this.props.changePage(newPage, char, lang)
  }

  handleNextPage = (nextPage) => {
    const {
      page,
      char,
      lang,
      changePage
    } = this.props

    changePage(parseInt(page, 10)+1, char, lang)
  }

  handleEnterClick = () => {
    if (this.searchEl === document.activeElement) {
      this.props.history.push(`/app/search?q=${this.searchEl.value}`)
    }
  }

  render() {
    const {
      currentPage,
      char,
      page,
      lang,
      lemmas
    } = this.props

    return (
      <Keydown keys={['Enter']} onKey={this.handleEnterClick}>
        <div className="lexiconmobile">
          <div className="lexicon__search">
            <input type="text" ref={el => this.searchEl = el}/>
            <img src={searchIcon} alt=""/>
            <FlagLanguageSelector
                lang={lang}
                onLanguageToggle={this.handleLanguageChange} />
          </div>
          <div className="lexiconmobile__main">
            <ScrollAlphabetPaginator
                currentPage={currentPage}
                char={char}
                page={page}
                lang={lang}
                useWindow={false}
                onLoadMore={this.handleNextPage}
                onLetterChange={this.handleLetterChange}
            >
              {lemmas.filter(_.identity).map(lemma => (
                <div className="lexiconmobile__lemma">
                  <Link className="resetlink" to={`/app/lemmas/${lemma.id}/`}>
                    {lemma.lemma}
                  </Link>
                </div>
              ))}
            </ScrollAlphabetPaginator>
          </div>
        </div>
      </Keydown>
    )
  }
}
function mapStateToProps(state, ownProps) {
  const search = queryString.parse(ownProps.location.search)
  const page = search.page || 1
  const pageParsed = parseInt(page, 10)
  const char = search.char || 'a'
  const lang = search.lang || 'deu'
  const pageConf = `lemma__istartswith=${char}&language__in=${lang}`
  const currentPage = lemmas.paginator.selectors.getPage(state, page, pageConf) || {}
  const allLemmas = lemmas.paginator.selectors.getPagesUpToResults(state, pageParsed, pageConf)
  return {
    page,
    char,
    currentPage,
    lang: lang.split(','),
    lemmas: allLemmas || []
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const location = ownProps.location.pathname
  return {
    changePage: (newPage, newChar, newLang) => {
      const newPageConf = `lemma__istartswith=${newChar}&language__in=${newLang}`
      dispatch(lemmas.paginator.actions.load(newPage, newPageConf))
      const newUrl = location + `?page=${newPage}&char=${newChar}&lang=${newLang}`
      ownProps.history.push(newUrl)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LexiconMobile))