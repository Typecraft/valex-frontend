import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import valenceframes from 'state/valenceframes'

import './MeaningValenceInline.css'

export class MeaningValenceInline extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    meaning: PropTypes.object,
    meaningValence: PropTypes.object,
    valenceFrame: PropTypes.object
  }

  static defaultProps = {
    valenceFrame: {}
  }

  componentDidMount = () => {
    this.props.load()
  }

  render = () => {
    const {
      className,
      meaningValence,
      meaning,
      valenceFrame
    } = this.props

    return (
      <div className={"meaningvalenceinline " + className}>
        <Link className="resetlink" to={`/app/meaning-valences/${meaningValence.id}`}>
          <h3 className="light">Valence {valenceFrame.name} for {meaning.meaning}</h3>
        </Link>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { meaning, meaningValence } = ownProps
  return {
    meaning,
    meaningValence,
    valenceFrame: valenceframes.selectors.getAll(state)[meaningValence.valenceFrame]
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const { meaningValence } = ownProps
  return {
    load: () => dispatch(valenceframes.actions.load(meaningValence.valenceFrame))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeaningValenceInline)
