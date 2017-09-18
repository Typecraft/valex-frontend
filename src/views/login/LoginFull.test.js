import React from 'react'
import { shallow } from 'enzyme'
import { LoginFull } from './LoginFull'

it('should render without crashing', () => {
  shallow( <LoginFull />)
})
