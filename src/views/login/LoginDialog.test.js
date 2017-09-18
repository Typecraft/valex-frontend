import React from 'react'
import { shallow } from 'enzyme'
import { LoginDialog } from './LoginDialog'

it('should render without crashing', () => {
  shallow( <LoginDialog />)
})
