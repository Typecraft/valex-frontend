import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import lemmas from 'state/lemmas'

export class EntryBreadcrumbs extends React.Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  render = () => {
    const {
      lemma
    } = this.props

    return (
      <div className="entrybreadcrumbs">
        {lemma.lemma}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    lemma: lemmas.selectors.getDetail(state, ownProps)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EntryBreadcrumbs))
