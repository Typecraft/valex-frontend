import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import StaffRequired from 'views/login/StaffRequired'

import './Main.css'

export class Main extends React.Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  render = () =>
    <main className="main">
      <StaffRequired>
        <div>
          Super secret stuff
        </div>
      </StaffRequired>
    </main>
}

export default Main;
