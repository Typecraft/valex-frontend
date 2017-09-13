import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import lemmas from 'state/lemmas'

import { ThreeBounce } from 'better-react-spinkit'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Link } from 'react-router-dom'

import './LemmaDetailEdit.css'

import SimpleForm from 'views/generic/forms/SimpleForm'

const formSchema = {
  lemma: 'Lemma',
  description: 'Description',
  citform: 'Citation Form',
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

export class LemmaDetailEdit extends React.Component {
  static propTypes = {
    lemma: PropTypes.object
  }

  static defaultProps = {

  }

  componentDidMount = () => {
    if (!this.props.lemma) {
      this.props.loadLemma()
    }
  }

  handleSubmit = formData => {
    this.props.saveLemma(Object.assign({}, this.props.lemma, formData))
  }

  render = () => {
    const lemma = this.props.lemma
    // Loading
    if (lemma === undefined) {
      return (
        <div className="lemmadetailedit lemmadetailedit--loading">
          <ThreeBounce size={30} />
        </div>
      )
    // Does not exist
    } else if (lemma === null) {
      return (
        <div className="lemmadetailedit lemmadetailedit--noexists">
          <span role="img" className="HUGE valex-purple" aria-label="Sadface">😞</span>
          <h2 className="light valex-purple">Lemma does not exist</h2>
        </div>
      )
    } else {
      return (
        <div className="lemmadetailedit">
          <Grid className="lemmadetailedit__inner">
            <Row className="mt-40">
              <h1 className="light darker-gray">{lemma.lemma}</h1>
              <Link to={`/app/lemmas/${lemma.id}`} className="lemmadetail__edit darker-gray"><i className="mdi mdi-keyboard-return"></i> Return</Link>
            </Row>
            <Row className="mt-20">
              <h3 className="light mb-10">Basic data</h3>
              <Col xs={12}>
                <SimpleForm
                  className="form-inline"
                  schema={formSchema}
                  widgets={formWidgets}
                  data={lemma}
                  submitText="Save"
                  onSubmit={this.handleSubmit} />
              </Col>
            </Row>
            <Row className="mt-20">
              <h3 className="light mb-10">Meanings</h3>
              <Col xs={12}>
                {!lemma.meanings || lemma.meanings.length === 0 ?
                  (<div>This lemma has no associated meanings. Lets create some!</div>):
                  (
                    <div>
                    {lemma.meanings.map(meaning => (
                      <div key={meaning}>{meaning}</div>
                    ))}
                    </div>
                  )
                }
              </Col>
            </Row>
          </Grid>
        </div>
      )
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    lemma: lemmas.selectors.getDetail(state, ownProps)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadLemma: () => dispatch(lemmas.actions.load(ownProps.match.params.lemmaId)),
    saveLemma: data => dispatch(lemmas.actions.update(data)),
    deleteLemma: data => dispatch(lemmas.actions.remove(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LemmaDetailEdit)
