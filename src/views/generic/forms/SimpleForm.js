import React from 'react'
import PropTypes from 'prop-types'

import SelectInput from './SelectInput'
import TextInput from './TextInput'

import './SimpleForm.css'


export class SimpleForm extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.string,
    schema: PropTypes.object,
    widgets: PropTypes.object,
    data: PropTypes.object,
    submitText: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    resetOnSubmit: PropTypes.bool
  }

  static defaultProps = {
    schema: {},
    data: {},
    submitText: "Submit",
    widgets: {},
    className: '',
    resetOnSubmit: true
  }

  constructor(props){
    super(props);
    this.state = {
      formData: Object.keys(this.props.schema).reduce((acc, key) => {
        if (key in props.data) {
          acc[key] = props.data[key]
        }
        return acc
      }, {}) || {}
    }
  }

  _overloadSchemaOpts(entry) {
    if (entry.constructor === String) {
      return {
        label: entry
      }
    } else if (entry.constructor === Array) {
      return {
        label: entry[0]
      }
    } else if (entry.constructor === Object) {
      return entry
    } else {
      return {}
    }
  }

  _overloadWidgetOpts(entry) {
    if (!entry) {
      return {}
    }

    if (entry.constructor === String) {
      return {
        type: entry
      }
    } else if (entry.constructor === Array) {
      return {
        type: entry[0],
        options: entry[1]
      }
    } else if (entry.constructor === Object) {
      return entry
    } else {
      return {}
    }
  }

  handleChange = (key, value) => {
    const newState = {
      ...this.state,
      formData: {
        ...this.state.formData,
        [key]: value
      }
    }
    if (this.props.onChange) {
      this.props.onChange(newState)
    }
    this.setState(newState)
  }

  handleKeyDown = event => {
    if (event.key === 'Enter') {
      this.handleSubmit()
    }
  }

  handleSubmit = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.formData)
    }
    if (this.props.resetOnSubmit) {
      this.setState({
        ...this.state,
        formData: {}
      })
    }
  }

  render = () =>
    <div className={`simpleform valex-form-control ${this.props.className}`} onKeyUp={this.handleKeyDown}>
      {Object.keys(this.props.schema).map((key, i) => {
        const { label } = this._overloadSchemaOpts(this.props.schema[key])
        const { type, options } = this._overloadWidgetOpts(this.props.widgets[key])
        const value = this.state.formData[key] || ""

        let inputWidget
        switch (type) {
          case 'select':
            inputWidget = (
              <SelectInput
                  value={value}
                  name="some name"
                  autoFocus={i === 0}
                  onChange={({value}) => this.handleChange(key, value)} {...options} />
            )
            break
          default:
            inputWidget = (
              <TextInput
                  value={value}
                  type={type}
                  autoFocus={i === 0}
                  onChange={event => this.handleChange(key, event.target.value)} />
            )
            break
        }
        return (
          <div key={key} className="form-group">
            <label>{label}</label>
            {inputWidget}
          </div>
        )
      })}
      <div className="form-group">
        {this.props.className.includes('form-inline') ? <label></label> : ""}
        <button className="valex-blue" onClick={this.handleSubmit}>{this.props.submitText}</button>
      </div>
    </div>
}

export default SimpleForm
