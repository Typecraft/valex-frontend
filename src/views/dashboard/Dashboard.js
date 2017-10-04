import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import lemmas from 'state/lemmas'

import { Grid, Row, Col } from 'react-flexbox-grid'

import UnderConstruction from 'views/generic/UnderConstruction'
import LemmaCard from 'views/lemmas/LemmaCard'
import SimpleForm from 'views/generic/forms/SimpleForm'

import DashboardSubscribe from 'views/dashboard/DashboardSubscribe'
import DashboardFooterNavigation from 'views/dashboard/DashboardFooterNavigation'
import DashboardContact from 'views/dashboard/DashboardContact'

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
              <input type="text" placeholder="Search"/>
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
        <div className="dashboard__footer bg-darker-gray">
          <Grid>
            <Row className="pb-10" style={{borderBottom: "1px solid gray"}}>
              <Col md={4} className="subscribe">
                <DashboardSubscribe />
              </Col>
              <Col md={4} className="navigation">
                <DashboardFooterNavigation />
              </Col>
              <Col md={4} className="Contact">
                <DashboardContact />
              </Col>
            </Row>
            <Row className="pt-10">
              <Col md={6}>
                <p className="gray center">
                  &copy; Copyright 2017
                </p>
              </Col>
              <Col md={6}>
                <h2 className="light valex-orange">Other sites</h2>
                <ul className="resetlist gray">
                  <li><a className="resetlink" href="https://typecraft.org">typecraft.org</a></li>
                  <li><a className="resetlink" href="http://login.typecraft.org">login.typecraft.org</a></li>
                  <li><a className="resetlink" href="http://runyankitara.typecraft.org">runyankitara.typecraft.org</a></li>
                </ul>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
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
