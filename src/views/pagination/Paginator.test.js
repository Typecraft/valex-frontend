import React from 'react'
import { shallow } from 'enzyme'
import { Paginator } from './Paginator'

it('should render without crashing', () => {
  shallow( <Paginator />)
})
