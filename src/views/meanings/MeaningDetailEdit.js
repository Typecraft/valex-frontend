import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import meanings from 'state/meanings'

import { ThreeBounce } from 'better-react-spinkit'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Link } from 'react-router-dom'

import './MeaningDetailEdit.css'

import SimpleForm from 'views/generic/forms/SimpleForm'

const formSchema = {
  meaning: 'Meaning',
  comment: 'Comment'
}

const formWidgets = {
}

export class MeaningDetailEdit extends React.Component {
  static propTypes = {
    meaning: PropTypes.object
  }

  static defaultProps = {

  }

  componentDidMount = () => {
    if (!this.props.meaning) {
      this.props.loadMeaning()
    }
  }

  handleSubmit = formData => {
    this.props.saveMeaning(Object.assign({}, this.props.meaning, formData))
  }

  render = () => {
    const meaning = this.props.meaning
    // Loading
    if (meaning === undefined) {
      return (
        <div className="meaningdetailedit meaningdetailedit--loading">
          <ThreeBounce size={30} />
        </div>
      )
    // Does not exist
    } else if (meaning === null) {
      return (
        <div className="meaningdetailedit meaningdetailedit--noexists">
          <span role="img" className="HUGE valex-purple" aria-label="Sadface">😞</span>
          <h2 className="light valex-purple">Meaning does not exist</h2>
        </div>
      )
    } else {
      return (
        <div className="meaningdetailedit">
          <Grid className="meaningdetailedit__inner">
            <Row className="mt-40">
              <h1 className="light darker-gray">{meaning.meaning}</h1>
              <Link to={`/app/meanings/${meaning.id}`} className="meaningdetail__edit darker-gray"><i className="mdi mdi-keyboard-return"></i> Return</Link>
            </Row>
            <Row className="mt-20">
              <h3 className="light mb-10">Basic data</h3>
              <Col xs={12}>
                <SimpleForm
                  className="form-inline"
                  schema={formSchema}
                  widgets={formWidgets}
                  data={meaning}
                  submitText="Save"
                  onSubmit={this.handleSubmit}
                  resetOnSubmit={false} />
              </Col>
            </Row>
            <Row className="mt-20">
              <h3 className="light mb-10">Valences</h3>
              <Col xs={12}>
                {!meaning.valences || meaning.valences.length === 0 ?
                  (<div>This meaning has no associated valences. Lets create some!</div>):
                  (
                    <div>
                    {meaning.valences.map(meaning => (
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
    meaning: meanings.selectors.getDetail(state, ownProps)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadMeaning: () => dispatch(meanings.actions.load(ownProps.match.params.meaningId)),
    saveMeaning: data => dispatch(meanings.actions.update(data)),
    deleteMeaning: data => dispatch(meanings.actions.remove(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeaningDetailEdit)
