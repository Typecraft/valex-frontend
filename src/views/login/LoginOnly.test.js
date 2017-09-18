import React from 'react'
import { shallow } from 'enzyme'
import { LoginOnly } from './LoginOnly'

it('should render without crashing', () => {
  shallow( <LoginOnly />)
})
