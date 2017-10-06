import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { withRouter, Link } from 'react-router-dom'
import queryString from 'query-string'

import lemmas from 'state/lemmas'
import meanings from 'state/meanings'

import Loader from 'views/generic/loaders/Loader'

import './Search.css'

export class Search extends React.Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  componentDidMount = () => {
    const {
      searchQuery
    } = this.props

    window.addEventListener('keyup', this.handleKeyUp)

    if (searchQuery !== '') {
      this.props.loadLemmas(searchQuery)
      this.props.loadMeanings(searchQuery)
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  handleKeyUp = event => {
    if (event.key === 'Enter') {
      this.handleSearch()
    } else if (event.key === '/') {
      this.inputElement.focus()
    }
  }

  handleSearch = () => {
    const searchValue = this.inputElement.value
    this.props.loadLemmas(searchValue)
    this.props.loadMeanings(searchValue)
    this.props.history.push(`/app/search?q=${searchValue}`)
  }

  render = () => {
    const {
      searchQuery,
      lemmas,
      meanings
    } = this.props

    return (
      <div className="search center">
        <div className="search__top">
          <div className="valex-form-control">
            <div className="form-group">
              <input defaultValue={searchQuery} type="text" placeholder="Search" ref={el => this.inputElement = el}/>
              <span className="submit-inform bg-valex-blue valex-highlight-blue" onClick={this.handleSearch}>
                <i className="mdi mdi-magnify"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="search__results bg-white-2">
          {searchQuery !== '' ?
            <Grid className="search__results">
              <Row>
                <Col md={6}>
                  <h2 className="light mb-5">Lemmas</h2>
                  <div className="card">
                    {lemmas ?
                    <table className="search__lemmaresults mb-20">
                      <thead>
                        <th className="bold">Lemma</th>
                      </thead>
                      <tbody>
                        {Object.values(lemmas).map(lemma => (
                          <tr key={lemma.id} className="lemmaoverview__lemmaentry">
                            <Link className="resetlink" to={`/app/lemmas/${lemma.id}`}>
                              <td>{lemma.lemma}</td>
                            </Link>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                      : <Loader />
                    }
                  </div>
                </Col>
                <Col md={6}>
                  <h2 className="light mb-5">Meanings</h2>
                  <div className="card">
                    {meanings ?
                    <table className="search__lemmaresults mb-20">
                      <thead>
                        <th className="bold">Meaning</th>
                      </thead>
                      <tbody>
                        {Object.values(meanings).map(meaning => (
                          <tr key={meaning.id} className="lemmaoverview__lemmaentry">
                            <Link className="resetlink" to={`/app/meanings/${meaning.id}`}>
                              <td>{meaning.meaning}</td>
                            </Link>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                      : <Loader />
                    }
                  </div>
                </Col>
              </Row>
            </Grid>
          : ""}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const searchQuery = queryString.parse(ownProps.location.search).q || ''
  const lemmaPage = (lemmas.paginator.selectors.getPage(
      state,
      1,
      `lemma__icontains=${searchQuery}`
    ) || {})
  const meaningPage = (meanings.paginator.selectors.getPage(
      state,
      1,
      `meaning__icontains=${searchQuery}`
    ) || {})
  console.log(meaningPage);
  return {
    searchQuery,
    lemmas: lemmaPage.results,
    meanings: meaningPage.results
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadLemmas: (searchQuery) => dispatch(lemmas.paginator.actions.load(1, `lemma__icontains=${searchQuery}`)),
    loadMeanings: (searchQuery) => dispatch(meanings.paginator.actions.load(1, `meaning__icontains=${searchQuery}`))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))
