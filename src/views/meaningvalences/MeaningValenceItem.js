import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import valenceframes from 'state/valenceframes'

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
      <li className={"meaningvalenceitem " + className}>
        <Link className="resetlink" to={`/app/meaning-valences/${meaningValence.id}`}>
          {valenceFrame.name}
        </Link>
      </li>
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