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
import MeaningLargeInline from 'views/meanings/MeaningLargeInline'

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
    console.log(relatedMeanings);

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
            <Row className="mt-40 mb-20">
              <Col xs={10}>
                <Link
                    to={`/app/lemmas/${meaning.lemma}/`}
                    className="btn btn-medium bg-valex-purple valex-highlight-purple">
                  <i className="mdi mdi-arrow-top-left"></i> Up to lemma
                </Link>
              </Col>
              <Col xs={2}>
                <StaffOnly style={{float: "right"}}>
                  <Link
                      to={`/app/meanings/${meaning.id}/edit`}
                      className="meaningdetail__edit darker-gray">
                      Edit <i className="mdi mdi-pencil"></i>
                  </Link>
                </StaffOnly>
              </Col>
            </Row>
            <Row className="mt-30">
              <h1 className="light darker-gray">{meaning.meaning}</h1>
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
                {!meaningValences || Object.keys(meaningValences).length === 0 ?
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
            <Row className="mt-20">
              <h3 className="light">Related meanings</h3>
              <Col xs={12}>
                {!relatedMeanings || relatedMeanings.length === 0 ?
                  (<div>This meaning has no related meanings</div>) :
                  (
                    <div>
                      {relatedMeanings
                        .filter(x => x)
                        .map(meaning => (
                          <MeaningLargeInline
                              key={meaning.id}
                              meaning={meaning}
                              className="mt-10" />
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
