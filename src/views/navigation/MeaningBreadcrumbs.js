import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import meanings from 'state/meanings'
import * as rootSelectors from 'state/selectors'

import Chevron from 'views/generic/Chevron'

export class MeaningBreadcrumbs extends React.Component {
  static propTypes = {
    meaning: PropTypes.object,
    lemma: PropTypes.object
  }

  static defaultProps = {
    meaning: {meaning: "Loading..."},
    lemma: {lemma: "Loading..."}
  }

  componentDidMount = () => {
    this.props.load()
  }

  render = () => {
    const {
      meaning,
      lemma
    } = this.props

    return (
      <div className="meaningbreadcrumbs thin">
        <Link to={`/app/lemmas/${lemma.id}`} className="resetlink pr-15">
          {lemma.lemma}
        </Link>
        <span>
          <Chevron size={10} color="#000" />
        </span>
        <span className="pl-15 pl-15">
          {meaning.meaning}
        </span>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    lemma: rootSelectors.getMeaningDetailLemma(state, ownProps),
    meaning: meanings.selectors.getDetail(state, ownProps)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const {
    meaningId
  } = ownProps.match.params
  return {
    load: () => dispatch(meanings.actions.load(meaningId, {loadParents: 1}))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MeaningBreadcrumbs))
