import React from 'react'
import { shallow } from 'enzyme'
import { UnderConstruction } from './UnderConstruction'

it('should render without crashing', () => {
  shallow( <UnderConstruction />)
})
