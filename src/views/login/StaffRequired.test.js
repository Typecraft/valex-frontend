import React from 'react'
import { shallow } from 'enzyme'
import { StaffRequired } from './StaffRequired'

it('should render without crashing', () => {
  shallow( <StaffRequired />)
})
