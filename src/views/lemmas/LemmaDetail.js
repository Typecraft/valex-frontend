import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import lemmas from 'state/lemmas'

import { ThreeBounce } from 'better-react-spinkit'

import './LemmaDetail.css'

export class LemmaDetail extends React.Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  componentDidMount = () => {
    if (!this.props.lemma) {
      this.props.loadLemma()
    }
  }

  render = () => {
    // Loading
    if (this.props.lemma === undefined) {
      return (
        <div className="lemmadetail lemmadetail--loading">
          <ThreeBounce size={30} />
        </div>
      )
    // Does not exist
    } else if (this.props.lemma === null) {
      return (
        <div className="lemmadetail lemmadetail--noexists">
          <span role="img" className="HUGE valex-purple" aria-label="Sadface">😞</span>
          <h2 className="light valex-purple">Lemma does not exist</h2>
        </div>
      )
    } else {
      return (
      <div className="lemmadetail">
        <h1>Exists!</h1>
      </div>
      )
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    lemma: lemmas.selectors.getDetail(state, ownProps)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadLemma: () => dispatch(lemmas.actions.load(ownProps.match.params.lemmaId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LemmaDetail)
