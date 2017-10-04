import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Grid, Row, Col } from 'react-flexbox-grid'
import './DashboardFooterNavigation.css'

export const DashboardFooterNavigation = ({props}) => (
  <div className="dashboardfooternavigation">
    <h2 className="light valex-orange">Navigation</h2>
    <Grid fluid>
      <Row>
        <Col md={6} sm={12}>
          <ul className="gray">
            <li><Link className="resetlink" to="/app/lemmas">Lemmas  &rsaquo;</Link></li>
            <li><Link className="resetlink" to="/app/lemmas">Meanings  &rsaquo;</Link></li>
            <li><Link className="resetlink" to="/app/lemmas">Examples  &rsaquo;</Link></li>
            <li><Link className="resetlink" to="/app/lemmas">Languages  &rsaquo;</Link></li>
          </ul>
        </Col>
        <Col md={6} sm={12}>
          <ul className="gray">
            <li><Link className="resetlink" to="/app/lemmas">About  &rsaquo;</Link></li>
            <li><Link className="resetlink" to="/app/lemmas">Contact  &rsaquo;</Link></li>
            <li><Link className="resetlink" to="/app/lemmas">Become a contributor  &rsaquo;</Link></li>
            <li><Link className="resetlink" to="/app/lemmas">Help  &rsaquo;</Link></li>
            <li><Link className="resetlink" to="/app/lemmas">Other resources  &rsaquo;</Link></li>
          </ul>
        </Col>
      </Row>
    </Grid>
  </div>
)

DashboardFooterNavigation.propTypes = {

}

DashboardFooterNavigation.defaultProps = {

}

export default DashboardFooterNavigation;
