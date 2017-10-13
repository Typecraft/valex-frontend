import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './AlphabetPaginator.css'

import Chevron from 'views/generic/Chevron'

const alphabet =
  'abcdefghijklmnopqrstuvwxyzæøå'.split("")

export class AlphabetPaginator extends React.Component {
  static propTypes = {
    currentPage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    currentCharacter: PropTypes.string,
    pageSize: PropTypes.number,
    onChangePage: PropTypes.func,
    onLetterChange: PropTypes.func,
    children: PropTypes.object,
    count: PropTypes.number,
    next: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    previous: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  }

  static defaultProps = {
    currentCharacter: 'a',
    onLetterChange: x => x,
    onChangePage: Function.identity
  }

  render = () => {
    const {
      children,
      currentCharacter,
      currentPage,
      previous,
      next,
      onChangePage
    } = this.props

    return (
      <div className="alphabetpaginator">
        <div className="alphabetpaginator__alphabet">
          {alphabet.map(char => {
            if (char === currentCharacter) {
              return (
                <span key={char} className="alphabetpaginator__char gray thin pl-7 pr-7">
                  {char}
                </span>
              )
            } else {
              return (
                <span
                    key={char}
                    onClick={() => this.props.onLetterChange(char)}
                    className="alphabetpaginator__char thin pl-7 pr-7">
                  {char}
                </span>
              )
            }
          }
          )}
        </div>
        {!!previous ? (
          <div className="alphabetpaginator__prev">
            <Chevron
                rotation="left"
                size={64}
                onClick={() => onChangePage(parseInt(currentPage, 10) - 1)} />
          </div>
        ) : ""}
        {children}
        {!!next ? (
          <div className="alphabetpaginator__next">
            <Chevron
                rotation="right"
                size={64}
                onClick={() => onChangePage(parseInt(currentPage, 10) + 1)} />
          </div>
        ) : ""}
      </div>
    )
  }
}

export default AlphabetPaginator
