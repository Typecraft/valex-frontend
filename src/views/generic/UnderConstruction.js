import React from 'react'

export const UnderConstruction = ({className=""}) => (
  <div className={"underconstruction " + className} style={{textAlign: 'center'}}>
    <div>
      <i className="mdi mdi-wrench" style={{fontSize: 80}}></i>
    </div>
    <div>
      Under construction
    </div>
  </div>
)

export default UnderConstruction;