import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import queryString from 'query-string'

import lemmas from 'state/lemmas'
import searchIcon from 'assets/search-gray.svg'

import { Grid, Row, Col } from 'react-flexbox-grid'

import Checkbox from 'views/generic/forms/Checkbox'
import Keydown from 'views/generic/Keydown'
import AlphabetPaginator from 'views/pagination/AlphabetPaginator'

import './LexiconDesktop.css'

export class LexiconDesktop extends React.Component {
  static propTypes = {
    lemmas: PropTypes.array,
    currentPage: PropTypes.object,
    char: PropTypes.string,
    page: PropTypes.string,
    lang: PropTypes.array
  }

  static defaultProps = {

  }

  componentDidMount = () => {
    this.props.changePage(this.props.page, this.props.char, this.props.lang)
  }

  handleLetterChange = (newChar) => {
    const {
      lang
    } = this.props
    this.props.changePage(1, newChar, lang)
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

  handleEnterClick = () => {
    if (this.searchEl === document.activeElement) {
      this.props.history.push(`/app/search?q=${this.searchEl.value}`)
    }
  }

  render = () => {
    const {
      lemmas,
      currentPage,
      char,
      page,
      lang,
    } = this.props
    return (
      <Keydown keys={['Enter']} onKey={this.handleEnterClick}>
        <div className="lexicon--desktop">
          <Grid>
            <Row>
              <Col lg={2}  className="lexicon__sidebar">
                <div className="lexicon__search">
                  <input type="text" ref={el => this.searchEl = el}/>
                  <img src={searchIcon} alt=""/>
                </div>
                <div className="lexicon__languageselect">
                  <div className="lexicon__languageoption">
                    <Checkbox checked={lang.includes('deu')} onChange={() => this.handleLanguageChange('deu')} id="deutsch" label="German" defaultChecked={true} />
                  </div>
                  <div className="lexicon__languageoption">
                    <Checkbox checked={lang.includes('nob')} onChange={() => this.handleLanguageChange('nob')} id="norwegian" label="Norwegian" />
                  </div>
                </div>
              </Col>
              <Col lg={10} className="lexicon__main">
                <AlphabetPaginator
                    next={currentPage.next}
                    previous={currentPage.previous}
                    onChangePage={this.handlePageChange}
                    onLetterChange={this.handleLetterChange}
                    currentCharacter={char}
                    currentPage={page}>
                  <div className="lexicon__table">
                    {lemmas.map(lemma => (
                      <div key={lemma.id} className="lexicon__cell">
                        <Link to={`/app/lemmas/${lemma.id}`} className="resetlink">
                          {lemma.lemma}
                        </Link>
                      </div>
                    ))}
                  </div>
                </AlphabetPaginator>
              </Col>
            </Row>
          </Grid>
        </div>
      </Keydown>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const search = queryString.parse(ownProps.location.search)
  const page = search.page || 1
  const char = search.char || 'a'
  const lang = search.lang || 'deu'
  const pageConf = `lemma__istartswith=${char}&language__in=${lang}`
  const currentPage = lemmas.paginator.selectors.getPage(state, page, pageConf) || {}
  return {
    page,
    char,
    currentPage,
    lang: lang.split(','),
    lemmas: currentPage.results || []
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LexiconDesktop))