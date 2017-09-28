import React from 'react'
import PropTypes from 'prop-types'


import './Paginator.css'

export class Paginator extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number,
    pageSize: PropTypes.number,
    onChangePage: PropTypes.func,
    children: PropTypes.object,
    count: PropTypes.number,
    next: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
  }

  static defaultProps = {
    currentPage: 1,
    pageSize: 2,
    next: false,
    onChangePage: x => x
  }

  handleKeyUp = event => {
    if (event.altKey || event.shiftKey || event.ctrlKey) {
      return
    }
    if (event.key === 'ArrowLeft') {
      if (this.props.currentPage !== 1) {
        this.props.onChangePage(this.props.currentPage-1)
      }
    } else if (event.key === 'ArrowRight') {
      if (this.props.currentPage !== Math.ceil(this.props.count / this.props.pageSize)) {
        this.props.onChangePage(this.props.currentPage+1)
      }
    }
  }
  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp)
  }

  render = () => {
    const { count, pageSize, currentPage, onChangePage } = this.props
    const maxPage = Math.ceil(count / pageSize)
    const center = Math.max(
      Math.min(maxPage - 3, currentPage),
      3, currentPage
    )
    const range = [...Array(5).keys()].map(x => (x - 2) + center).filter(x => x <= maxPage)
    return (
      <div className="paginator">
        <ul className="paginator__nav paginator__topnav">
          {currentPage > 1 && maxPage > 0 ? (
            <li className="paginator__navitem" onClick={() => onChangePage(currentPage-1)}>&laquo;</li>
          ) : ""}
          {range.map(x => (
            <li
                className={`paginator__navitem ${currentPage === x ? 'active': ''}`}
                key={x}
                onClick={() => onChangePage(x)}>
              {x}
            </li>
          ))}
          {currentPage !== maxPage && maxPage > 0 ? (
            <li className="paginator__navitem" onClick={() => onChangePage(currentPage+1)}>&raquo;</li>
          ) : ""}
        </ul>
        {this.props.children}
      </div>
    )
  }
}

export default Paginator