
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import meaningValences from 'state/meaningvalences'
import valenceframes from 'state/valenceframes'
import * as rootSelectors from 'state/selectors'

import Chevron from 'views/generic/Chevron'

export class MeaningValenceBreadcrumbs extends React.Component {
  static propTypes = {
    meaningValence: PropTypes.object,
    meaning: PropTypes.object,
    lemma: PropTypes.object
  }

  static defaultProps = {
    meaning: {meaning: "Loading..."},
    lemma: {lemma: "Loading..."},
    valenceFrame: {name: "Loading..."}
  }

  render = () => {
    const {
      meaning,
      lemma,
      valenceFrame
    } = this.props

    return (
      <div className="meaningbreadcrumbs thin">
        <Link to={`/app/lemmas/${lemma.id}`} className="resetlink pr-10">
          {lemma.lemma}
        </Link>
        <span>
          <Chevron size={10} color="#000" />
        </span>
        <Link to={`/app/meanings/${meaning.id}`} className="resetlink pl-10 pr-10">
          {meaning.meaning}
        </Link>
        <span>
          <Chevron size={10} color="#000" />
        </span>
        <span className="pl-10">
          {valenceFrame.name}
        </span>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const meaningValence = meaningValences.selectors.getDetail(state, ownProps)
  return {
    meaningValence,
    meaning: rootSelectors.getMeaningValenceDetailMeaning(state, ownProps),
    valenceFrame: valenceframes.selectors.getById(state, (meaningValence || {}).valenceFrame),
    lemma: rootSelectors.getMeaningValenceDetailLemma(state, ownProps)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MeaningValenceBreadcrumbs))
