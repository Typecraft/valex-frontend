import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import meanings from 'state/meanings'
import * as rootSelectors from 'state/selectors'

import { ThreeBounce } from 'better-react-spinkit'
import { Link } from 'react-router-dom'
import { Grid, Row, Col } from 'react-flexbox-grid'

import StaffOnly from 'views/login/StaffOnly'
import MeaningValenceItem from 'views/meaningvalences/MeaningValenceItem'
import MeaningLargeInline from 'views/meanings/MeaningLargeInline'

import MeaningBreadcrumbs from 'views/navigation/MeaningBreadcrumbs'

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
      meaningValences,
      relatedMeanings,
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
        <Grid className="meaningdetail">
          <div className="meaningdetail__inner">
            <Row>
              <h1 className="mb-0">{meaning.meaning}</h1>
            </Row>
            <hr/>
            <Row className="mt-15">
              <MeaningBreadcrumbs />
            </Row>
            <Row>
              <h3 className="light mt-20 mb-0">Basic data</h3>
              <Col xs={12}>
                <table className="thin spaced-table mt-5">
                  <tbody>
                    <tr>
                      <td>Meaning</td>
                      <td className="italic">{meaning.meaning}</td>
                    </tr>
                    <tr>
                      <td>Comments</td>
                      <td className="italic">{meaning.comment || 'This meaning has no comments'}</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
            <Row>
              <h3 className="light">Valences</h3>
              <Col xs={12}>
                {!meaningValences || Object.keys(meaningValences).length === 0 ?
                  (<div>This meaning has no associated valences</div>):
                  (
                    <ol className="m-0 padded-list">
                      {Object.values(meaningValences)
                        .filter(x => x)
                        .map(meaningValence => (
                          <MeaningValenceItem
                              className="italic thin"
                              key={meaningValence.id}
                              meaningValence={meaningValence}
                              meaning={meaning} />
                      ))}
                    </ol>
                  )
                }
              </Col>
            </Row>
            <Row>
              <h3 className="light">Related meanings</h3>
              <Col xs={12}>
                {!relatedMeanings || relatedMeanings.length === 0 ?
                  (<div>This meaning has no related meanings</div>) :
                  (
                    <ol className="m-0 padded-list">
                      {relatedMeanings
                        .filter(x => x)
                        .map(meaning => (
                          <li className="thin italic" key={meaning.id}>
                            <Link className="resetlink" to={`/app/meanings/${meaning.id}/`}>{meaning.meaning}</Link>
                          </li>
                        ))}
                    </ol>
                  )
                }
              </Col>
            </Row>
          </div>
        </Grid>
      )
    }
  }
}

function mapStateToProps(state, ownProps) {
  const { meaningId } = ownProps.match.params
  return {
    meaning: meanings.selectors.getDetail(state, ownProps),
    meaningValences: rootSelectors.getMeaningValences(state, meaningId),
    relatedMeanings: meanings.selectors.getDetailRelatedMeanings(state, ownProps),
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadMeaning: () => dispatch(meanings.actions.load(ownProps.match.params.meaningId, {loadRelated: 1}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeaningDetail)
