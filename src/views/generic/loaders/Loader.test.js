import React from 'react'
import { shallow } from 'enzyme'
import { Loader } from './Loader'

it('should render without crashing', () => {
  shallow( <Loader />)
})
