import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import InfiniteScroller from 'react-infinite-scroller'
import './ScrollAlphabetPaginator.css'

const alphabet =
  'abcdefghijklmnopqrstuvwxyzæøå'.split("")


export const ScrollAlphabetPaginator = ({
  children,
  loadPage,
  currentPage,
  page,
  onLoadMore,
  useWindow,
  currentCharacter,
  onLetterChange
}) => (
  <div className="scrollalphabetpaginator">
    <InfiniteScroller
        pageStart={0}
        useWindow={useWindow}
        hasMore={!!currentPage.next}
        loadMore={onLoadMore}>
      {children}
    </InfiniteScroller>
    <div className="scrollalphabetpaginator__sidebar">
      <div className="scrollalphabetpaginator__alphabet">
        {alphabet.map(char => {
          if (char === currentCharacter) {
            return (
              <span key={char} className="scrollalphabetpaginator__char gray thin">
                {char}
              </span>
            )
          } else {
            return (
              <span
                  key={char}
                  onClick={() => onLetterChange(char)}
                  className="scrollalphabetpaginator__char thin">
                {char}
              </span>
            )
          }
        }
        )}
      </div>
    </div>
  </div>
)

ScrollAlphabetPaginator.propTypes = {
  children: PropTypes.array,
  loadPage: PropTypes.func,
  currentPage: PropTypes.object,
  page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onLoadMore: PropTypes.func,
  useWindow: PropTypes.bool,
  currentCharacter: PropTypes.string,
  onLetterChange: PropTypes.func
}

ScrollAlphabetPaginator.defaultProps = {
  currentCharacter: 'a',
  onLetterChange: _.identity,
  onLoadMore: _.identity
}

export default ScrollAlphabetPaginator;
