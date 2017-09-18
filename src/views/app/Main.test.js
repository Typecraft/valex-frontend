import React from 'react'
import { shallow } from 'enzyme'
import { Main } from './Main'

it('should render without crashing', () => {
  shallow( <Main />)
})
