import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import lemmas from 'state/lemmas'

import * as rootSelectors from 'state/selectors'

import { ThreeBounce } from 'better-react-spinkit'
import { Link } from 'react-router-dom'
import { Grid, Row, Col } from 'react-flexbox-grid'

import { iso639ToLang } from 'util/language'

import './LemmaDetail.css'

export class LemmaDetail extends React.Component {
  static propTypes = {
    lemma: PropTypes.object
  }

  static defaultProps = {

  }

  componentDidMount = () => {
    this.props.loadLemma()
  }

  render = () => {
    const {
      lemma,
      lemmaMeanings
    } = this.props

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
        </div>
      )
    } else {
      return (
        <Grid className="lemmadetail">
          <div className="lemmadetail__inner">
            {/*<Row className="mt-40">
              <h1 className="light darker-gray">{lemma.lemma}</h1>
              <StaffOnly><Link to={`/app/lemmas/${lemma.id}/edit`} className="lemmadetail__edit darker-gray">Edit <i className="mdi mdi-pencil"></i></Link></StaffOnly>
            </Row>*/}
            <Row>
              <h1 className="lemmadetail__header">{lemma.lemma}</h1>
            </Row>
            <hr/>
            <Row>
              <h3 className="light mt-20">Basic data</h3>
              <Col xs={12}>
                <table className="thin spaced-table">
                  <tbody>
                    <tr>
                      <td>Lemma:</td>
                      <td className="italic">{lemma.lemma}</td>
                    </tr>
                    <tr>
                      <td>Citation form:</td>
                      <td className="italic">{lemma.citationForm || 'This lemma has no registered Citation Form'}</td>
                    </tr>
                    <tr>
                      <td>Language:</td>
                      <td className="italic">{iso639ToLang(lemma.language)}</td>
                    </tr>
                    <tr>
                      <td>Comments:</td>
                      <td className="italic">{lemma.comment || 'This lemma has no comments'}</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
            <Row className="mt-20">
              <h3 className="light">Meanings</h3>
              <Col xs={12}>
                {!lemmaMeanings || Object.keys(lemmaMeanings).length === 0 ?
                  (<div>This lemma has no associated meanings</div>):
                  (
                    <ol className="m-0 padded-list">
                    {Object.values(lemmaMeanings).filter(x => x).map(meaning => (
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
  const {
    lemmaId
  } = ownProps.match.params
  return {
    lemma: lemmas.selectors.getDetail(state, ownProps),
    lemmaMeanings: rootSelectors.getLemmaMeanings(state, lemmaId)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadLemma: () => dispatch(lemmas.actions.load(ownProps.match.params.lemmaId, {loadRelated: 1})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LemmaDetail)
