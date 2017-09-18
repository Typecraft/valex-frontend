import React from 'react'
import { shallow } from 'enzyme'
import { FullPageLoader } from './FullPageLoader'

it('should render without crashing', () => {
  shallow( <FullPageLoader />)
})
