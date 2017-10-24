import React from 'react'

import MediaQuery from 'react-responsive'

import LexiconMobile from './LexiconMobile'
import LexiconDesktop from './LexiconDesktop'

import './Lexicon.css'

export class Lexicon extends React.Component {
  static propTypes = {
  }

  static defaultProps = {

  }

  render = () => {
    return (
      <div className="lexicon">
        <MediaQuery query="(max-device-width: 1024px)">
          <LexiconMobile />
        </MediaQuery>
        <MediaQuery query="(min-device-width: 1025px)">
          <LexiconDesktop />
        </MediaQuery>
      </div>
    )
  }
}

export default Lexicon