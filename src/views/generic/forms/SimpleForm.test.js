import React from 'react'
import { shallow } from 'enzyme'
import { SimpleForm } from './SimpleForm'

it('should render without crashing', () => {
  shallow( <SimpleForm />)
})
