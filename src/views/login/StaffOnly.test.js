import React from 'react'
import { shallow } from 'enzyme'
import { StaffOnly } from './StaffOnly'

it('should render without crashing', () => {
  shallow( <StaffOnly />)
})
