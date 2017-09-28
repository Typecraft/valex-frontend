import React from 'react'
import { Link } from 'react-router-dom'

import './MeaningLargeInline.css'

export const MeaningLargeInline = ({
  meaning,
  className,
  style
}) => (
  <div className={"meaninglargeinline " + className}>
    <Link className="resetlink" to={`/app/meanings/${meaning.id}`}>
      <h3 className="light">{meaning.meaning}</h3>
    </Link>
  </div>
)

MeaningLargeInline.propTypes = {

}

MeaningLargeInline.defaultProps = {

}

export default MeaningLargeInline;
