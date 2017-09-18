import React from 'react'
import { shallow } from 'enzyme'
import { LemmaOverview } from './LemmaOverview'

it('should render without crashing', () => {
  shallow( <LemmaOverview />)
})
