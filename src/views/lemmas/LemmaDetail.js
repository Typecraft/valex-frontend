import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import lemmas from 'state/lemmas'

import { ThreeBounce } from 'better-react-spinkit'

import { Grid, Row, Col } from 'react-flexbox-grid'

import './LemmaDetail.css'

export class LemmaDetail extends React.Component {
  static propTypes = {
    lemma: PropTypes.object
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
      const lemma = this.props.lemma
      return (
        <div className="lemmadetail">
          <Grid className="lemmadetail__inner">
            <Row className="mt-40">
              <h1 className="light darker-gray">{lemma.lemma}</h1>
              <div className="lemmadetail__edit darker-gray">Edit <i className="mdi mdi-pencil"></i></div>
            </Row>
            <Row className="mt-20">
              <h3 className="light">Basic data</h3>
              <Col xs={12}>
                <table>
                  <tbody>
                    <tr>
                      <td>Lemma</td>
                      <td>{lemma.lemma}</td>
                    </tr>
                    <tr>
                      <td>Language</td>
                      <td>{lemma.language}</td>
                    </tr>
                    <tr>
                      <td>Citation form</td>
                      <td>{lemma.citform || 'This lemma has no registered Citation Form'}</td>
                    </tr>
                    <tr>
                      <td>Comments</td>
                      <td>{lemma.comments || 'This lemma has no comments'}</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
            <Row className="mt-20">
              <h3 className="light">Meanings</h3>
              <Col xs={12}>
                {!lemma.meanings || lemma.meanings.length === 0 ?
                  (<div>This lemma has no associated meanings</div>):
                  (
                    <div>
                    {lemma.meanings.map(meaning => (
                      <div key={meaning}>{meaning}</div>
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
