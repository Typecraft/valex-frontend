import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import lemmas from 'state/lemmas'

import { Grid, Row, Col } from 'react-flexbox-grid'

import UnderConstruction from 'views/generic/UnderConstruction'
import LemmaCard from 'views/lemmas/LemmaCard'

import './Dashboard.css'

export class Dashboard extends React.Component {
  static propTypes = {
    lemmaOfTheDay: PropTypes.object
  }

  static defaultProps = {
    lemmaOfTheDay: {
      lemma: "Loading.."
    }
  }

  componentDidMount = () => {
    this.props.loadLemmaOfTheDay()
  }

  render = () => {
    const {
      lemmaOfTheDay
    } = this.props

    return (
      <div className="dashboard">
        <div className="dashboard__search bg-valex-light-purple">
          <div className="valex-form-control form-colors-inverse">
            <div className="form-group">
              <input type="text" placeholder="Browse Valex"/>
              <span className="submit-inform bg-valex-blue valex-lighter-blue"><i className="mdi mdi-magnify"></i></span>
            </div>
          </div>
        </div>
        <div className="dashboard__info bg-white-2">
          <Grid>
            <Row>
              <Col md={6} className="dashboard__infocard">
                <LemmaCard title="Lemma of the Day" lemma={lemmaOfTheDay} />
              </Col>
              <Col md={6} className="dashboard__infocard">
                <div className="card">
                  <h2 className="valex-purple light">Popular entries</h2>
                  <UnderConstruction className="valex-purple"/>
                </div>
              </Col>
            </Row>
            <Row className="mt-20">
              <Col md={6} className="dashboard__infocard">
                <div className="card">
                  <h2 className="valex-purple light">Behind the scenes</h2>
                  <UnderConstruction className="valex-purple" />
                </div>
              </Col>
              <Col md={6} className="dashboard__infocard">
                <div className="card">
                  <h2 className="valex-purple light">Data</h2>
                  <UnderConstruction className="valex-purple"/>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(lemmas.selectors.getLemmaOfTheDay(state))
  return {
    lemmaOfTheDay: lemmas.selectors.getLemmaOfTheDay(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadLemmaOfTheDay: () => dispatch(lemmas.actions.loadOfTheDay())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
