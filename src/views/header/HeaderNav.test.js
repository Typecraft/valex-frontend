import React from 'react'
import { shallow } from 'enzyme'
import { HeaderNav } from './HeaderNav'

it('should render without crashing', () => {
  shallow( <HeaderNav />)
})
