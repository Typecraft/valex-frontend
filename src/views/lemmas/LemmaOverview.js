import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

import { Grid } from 'react-flexbox-grid'
import { Link } from 'react-router-dom'

import lemmas from 'state/lemmas'
import { DEFAULT_PAGE_SIZE } from 'util/pagination'

import FullPageLoader from 'views/generic/loaders/FullPageLoader'
import Paginator from 'views/pagination/Paginator'

import StaffOnly from 'views/login/StaffOnly'

import './LemmaOverview.css'

export class LemmaOverview extends React.Component {
  static propTypes = {
    currentPage: PropTypes.object,
    lemmas: PropTypes.arrayOf(PropTypes.object),
    count: PropTypes.number
  }

  static defaultProps = {
    currentPage: 1,
    lemmas: [],
    count: 0
  }

  componentDidMount() {
    this.props.loadPage(this.props.currentPage.page)
  }

  handleChangePage = page => {
    this.props.changePage(page)
  }

  render = () => {
    if (!this.props.lemmas) {
      return (
        <FullPageLoader />
      )
    }
    const { page, next } = this.props.currentPage
    return (
      <div className="lemmaoverview">
        <Grid className="mt-40 lemmaoverview__grid">
          <StaffOnly className="lemmaoverview__create valex-highlight-purple">
            <Link
                to="/app/lemmas/create"
                className="resetlink btn bg-valex-purple valex-highlight-purple">
              <i className="mdi mdi-plus-circle"></i> Add new
            </Link>
          </StaffOnly>
          <Paginator
              currentPage={page}
              next={next}
              count={this.props.count}
              pageSize={DEFAULT_PAGE_SIZE}
              onChangePage={this.handleChangePage}>
            <table className="lemmaoverview__table mb-20">
              <thead>
                <th className="bold">Lemma</th>
              </thead>
              <tbody>
                {Object.values(this.props.lemmas).map(lemma => (
                  <tr key={lemma.id} className="lemmaoverview__lemmaentry">
                    <Link className="resetlink" to={`/app/lemmas/${lemma.id}`}>
                      <td>{lemma.lemma}</td>
                    </Link>
                  </tr>
                ))}
              </tbody>
            </table>
          </Paginator>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const page = queryString.parse(ownProps.location.search).page || 1
  const currentPage = lemmas.paginator.selectors.getPage(state, page)
  return {
    page,
    lemmas: (currentPage || {}).results,
    currentPage,
    count: lemmas.paginator.selectors.getConfigCount(state)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    changePage: page => {
      dispatch(lemmas.paginator.actions.load(page))
      const newUrl = ownProps.location.pathname + `?page=${page}`
      ownProps.history.push(newUrl)
    },
    loadPage: page => dispatch(lemmas.paginator.actions.load(page))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LemmaOverview))
