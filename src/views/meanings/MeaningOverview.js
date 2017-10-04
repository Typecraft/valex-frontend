import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

import { Grid } from 'react-flexbox-grid'
import { Link } from 'react-router-dom'

import meanings from 'state/meanings'
import { DEFAULT_PAGE_SIZE } from 'util/pagination'

import FullPageLoader from 'views/generic/loaders/FullPageLoader'
import Paginator from 'views/pagination/Paginator'

import StaffOnly from 'views/login/StaffOnly'

import './MeaningOverview.css'

export class MeaningOverview extends React.Component {
  static propTypes = {
    currentPage: PropTypes.object,
    meanings: PropTypes.arrayOf(PropTypes.object),
    count: PropTypes.number
  }

  static defaultProps = {
    currentPage: {page: 1},
    meanings: [],
    count: 0
  }

  componentDidMount() {
    this.props.loadPage(this.props.currentPage.page)
  }

  handleChangePage = page => {
    this.props.changePage(page)
  }

  render = () => {
    if (!this.props.meanings) {
      return (
        <FullPageLoader />
      )
    }
    const { page, next } = this.props.currentPage
    return (
      <div className="meaningoverview">
        <Grid className="mt-40 meaningoverview__grid">
          <StaffOnly className="meaningoverview__create valex-highlight-purple">
            <Link
                to="/app/meanings/create"
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
            <table className="meaningoverview__table">
              <thead>
                <td className="bold">Meaning</td>
              </thead>
              <tbody>
                {Object.values(this.props.meanings).map(meaning => (
                  <tr key={meaning.id} className="meaningoverview__meaningentry">
                    <Link className="resetlink" to={`/app/meanings/${meaning.id}`}>
                      <td>{meaning.meaning}</td>
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
  const currentPage = meanings.paginator.selectors.getPage(state, page)
  return {
    page,
    meanings: (currentPage || {}).results,
    currentPage,
    count: meanings.paginator.selectors.getConfigCount(state)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    changePage: page => {
      dispatch(meanings.paginator.actions.load(page))
      const newUrl = ownProps.location.pathname + `?page=${page}`
      ownProps.history.push(newUrl)
    },
    loadPage: page => dispatch(meanings.paginator.actions.load(page))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MeaningOverview))
