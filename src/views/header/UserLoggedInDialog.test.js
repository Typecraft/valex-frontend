import React from 'react'
import { shallow } from 'enzyme'
import { UserLoggedInDialog } from './UserLoggedInDialog'

it('should render without crashing', () => {
  shallow( <UserLoggedInDialog />)
})
