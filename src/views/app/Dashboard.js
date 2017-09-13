import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './Dashboard.css'

import UnderConstruction from 'views/generic/UnderConstruction'
import { Grid, Row, Col } from 'react-flexbox-grid'

export class Dashboard extends React.Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  render = () =>
    <div className="dashboard">
      <div className="dashboard__search bg-valex-light-purple">
        <div className="valex-form-control form-colors-inverse">
          <div className="form-group">
            <input type="text" placeholder="Browse Valex"/>
            <span className="submit-inform bg-valex-blue valex-lighter-blue"><i className="mdi mdi-magnify"></i></span>
          </div>
        </div>
      </div>
      <div className="dashboard__info">
        <Grid>
          <Row>
            <Col md={6} className="dashboard__infocard">
              <h2 className="valex-purple light">Lemma of the day</h2>
              <UnderConstruction className="valex-purple" />
            </Col>
            <Col md={6} className="dashboard__infocard">
              <h2 className="valex-purple light">Popular entries</h2>
              <UnderConstruction className="valex-purple"/>
            </Col>
          </Row>
          <Row className="mt-20">
            <Col md={6} className="dashboard__infocard">
              <h2 className="valex-purple light">Behind the scenes</h2>
              <UnderConstruction className="valex-purple" />
            </Col>
            <Col md={6} className="dashboard__infocard">
              <h2 className="valex-purple light">Data</h2>
              <UnderConstruction className="valex-purple"/>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
