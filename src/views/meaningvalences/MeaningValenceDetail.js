
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import meanings from 'state/meanings'
import meaningvalences from 'state/meaningvalences'
import valenceframes from 'state/valenceframes'
import * as rootSelectors from 'state/selectors'

import { ThreeBounce } from 'better-react-spinkit'
import { Link } from 'react-router-dom'
import { Grid, Row, Col } from 'react-flexbox-grid'

import StaffOnly from 'views/login/StaffOnly'
// import MeaningValenceInline from 'views/meaningvalences/MeaningValenceInline'
import ExampleLargeInline from 'views/examples/ExampleLargeInline'

import './MeaningValenceDetail.css'

export class MeaningValenceDetail extends React.Component {
  static propTypes = {
    meaning: PropTypes.object,
    meaningValence: PropTypes.object,
    valenceFrame: PropTypes.object
  }

  static defaultProps = {
    meaning: {},
    valenceFrame: {}
  }

  componentDidMount = () => {
    this.props.load()
  }

  render = () => {
    const {
      meaning,
      meaningValence,
      valenceFrame,
      examples
    } = this.props

    // Loading
    if (meaningValence === undefined) {
      return (
        <div className="meaningvalencedetail meaningvalencedetail--loading">
          <ThreeBounce size={30} />
        </div>
      )
    // Does not exist
    } else if (meaningValence === null) {
      return (
        <div className="meaningvalencedetail meaningvalencedetail--noexists">
          <span role="img" className="HUGE valex-purple" aria-label="Sadface">😞</span>
        </div>
      )
    } else {
      return (
        <div className="meaningvalencedetail">
          <Grid className="meaningvalencedetail__inner">
            <Row className="mt-40">
              <Col xs={10}>
                <Link
                    to={`/app/meanings/${meaning.id}/`}
                    className="btn btn-medium bg-valex-purple valex-highlight-purple">
                  <i className="mdi mdi-arrow-top-left"></i> Up to meaning
                </Link>
              </Col>
              <Col xs={2}>
                <StaffOnly>
                  <Link
                      to={`/app/meaning-valences/${meaningValence.id}/edit`}
                      className="meaningvalencedetail__edit darker-gray">
                    Edit <i className="mdi mdi-pencil"></i>
                  </Link>
                </StaffOnly>
              </Col>
            </Row>
            <Row className="mt-20">
              <h3 className="light">Basic data</h3>
              <Col xs={12}>
                <table>
                  <tbody>
                    <tr>
                      <td>Meaning</td>
                      <td>{meaning.meaning}</td>
                    </tr>
                    <tr>
                      <td>Valence</td>
                      <td>{valenceFrame.name}</td>
                    </tr>
                    <tr>
                      <td>Comments</td>
                      <td>{meaning.comment || 'This meaning has no comments'}</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
            <Row className="mt-20">
              <h3 className="light">Examples</h3>
              <Col xs={12}>
                {!examples || Object.keys(examples).filter(x=>x).length === 0 ?
                  (<div>This meaning has no associated examples</div>):
                  (
                    <div>
                      {Object.values(examples)
                        .filter(x => x)
                        .map(example => (
                        <ExampleLargeInline
                            className="mt-10"
                            key={meaningValence.id}
                            example={example} />
                      ))}
                    </div>
                  )
                }
              </Col>
            </Row>
          </Grid>
        </div>
      )
    }
  }
}

function mapStateToProps(state, ownProps) {
  const meaningValence = meaningvalences.selectors.getDetail(state, ownProps) || {}
  const { meaningValenceId } = ownProps.match.params
  return {
    meaning: meanings.selectors.getAll(state)[meaningValence.meaning],
    valenceFrame: valenceframes.selectors.getAll(state)[meaningValence.valenceFrame],
    meaningValence,
    examples: rootSelectors.getMeaningValenceExamples(state, meaningValenceId)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const { meaningValenceId } = ownProps.match.params
  return {
    load: () => dispatch(meaningvalences.actions.load(
      meaningValenceId,
      {loadRelated: 1}
    ))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeaningValenceDetail)