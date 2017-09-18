import React from 'react'
import { shallow } from 'enzyme'
import { UserLoginHeaderButton } from './UserLoginHeaderButton'

it('should render without crashing', () => {
  shallow( <UserLoginHeaderButton />)
})
