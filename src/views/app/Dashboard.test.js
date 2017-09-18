import React from 'react'
import { shallow } from 'enzyme'
import { Dashboard } from './Dashboard'

it('should render without crashing', () => {
  shallow( <Dashboard />)
})
