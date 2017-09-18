import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import lemmas from 'state/lemmas'

import SimpleForm from 'views/generic/forms/SimpleForm'

import './LemmaCreate.css'

const formSchema = {
  lemma: 'Lemma',
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

export class LemmaCreate extends React.Component {
  static propTypes = {
    create: PropTypes.func
  }

  static defaultProps = {
    create: x => x
  }

  render = () =>
    <div className="lemmacreate flex-col flex-ver-center">
      <h1 className="light mb-20">Create new lemma</h1>
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
      dispatch(lemmas.actions.create(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LemmaCreate)
