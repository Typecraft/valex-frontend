import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import meanings from 'state/meanings'

import SimpleForm from 'views/generic/forms/SimpleForm'

import './MeaningCreate.css'

const formSchema = {
  meaning: 'Meaning',
  description: 'Description',
  language: 'Language'
}

const formWidgets = {
  language: {
    type: 'select',
    options: {
      options: [
        {value: 'nob', label: 'Norwegian Bokmål'},
        {value: 'deu', label: 'German'},
      ],
      searchable: false
    }
  }
}

const data = {
  language: 'nob'
}

export class MeaningCreate extends React.Component {
  static propTypes = {
    create: PropTypes.func
  }

  static defaultProps = {
    create: x => x
  }

  render = () =>
    <div className="meaningcreate flex-col flex-ver-center">
      <h1 className="light mb-20">Create new meaning</h1>
      <SimpleForm schema={formSchema} widgets={formWidgets} submitText="Create" data={data} onSubmit={this.props.create} />
    </div>
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    create: data => {
      dispatch(meanings.actions.create(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeaningCreate)
