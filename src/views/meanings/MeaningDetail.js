import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import meanings from 'state/meanings'
import * as rootSelectors from 'state/selectors'

import { ThreeBounce } from 'better-react-spinkit'
import { Link } from 'react-router-dom'
import { Grid, Row, Col } from 'react-flexbox-grid'

import StaffOnly from 'views/login/StaffOnly'
import MeaningValenceInline from 'views/meaningvalences/MeaningValenceInline'

import './MeaningDetail.css'

export class MeaningDetail extends React.Component {
  static propTypes = {
    meaning: PropTypes.object
  }

  static defaultProps = {

  }

  componentDidMount = () => {
    this.props.loadMeaning()
  }

  render = () => {
    const {
      meaning,
      meaningValences
    }= this.props

    // Loading
    if (this.props.meaning === undefined) {
      return (
        <div className="meaningdetail meaningdetail--loading">
          <ThreeBounce size={30} />
        </div>
      )
    // Does not exist
    } else if (this.props.meaning === null) {
      return (
        <div className="meaningdetail meaningdetail--noexists">
          <span role="img" className="HUGE valex-purple" aria-label="Sadface">😞</span>
        </div>
      )
    } else {
      return (
        <div className="meaningdetail">
          <Grid className="meaningdetail__inner">
            <Row className="mt-40">
              <h1 className="light darker-gray">{meaning.meaning}</h1>
              <StaffOnly><Link to={`/app/meanings/${meaning.id}/edit`} className="meaningdetail__edit darker-gray">Edit <i className="mdi mdi-pencil"></i></Link></StaffOnly>
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
                      <td>Comments</td>
                      <td>{meaning.comment || 'This meaning has no comments'}</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
            <Row className="mt-20">
              <h3 className="light">Valences</h3>
              <Col xs={12}>
                {!meaningValences || meaningValences.length === 0 ?
                  (<div>This meaning has no associated valences</div>):
                  (
                    <div>
                      {Object.values(meaningValences)
                        .filter(x => x)
                        .map(meaningValence => (
                        <MeaningValenceInline
                            className="mt-10"
                            key={meaningValence.id}
                            meaningValence={meaningValence}
                            meaning={meaning} />
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
  const { meaningId } = ownProps.match.params
  return {
    meaning: meanings.selectors.getDetail(state, ownProps),
    meaningValences: rootSelectors.getMeaningValences(state, meaningId)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadMeaning: () => dispatch(meanings.actions.load(ownProps.match.params.meaningId, {loadRelated: 1}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeaningDetail)
