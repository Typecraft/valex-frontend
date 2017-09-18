import React from 'react'
import { shallow } from 'enzyme'
import { LoginRequired } from './LoginRequired'

it('should render without crashing', () => {
  shallow( <LoginRequired />)
})
