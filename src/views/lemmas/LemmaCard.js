import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { iso639ToLang } from 'util/language'

import './LemmaCard.css'

export const LemmaCard = ({
  lemma,
  title,
  className,
  style
}) => (
  <div className={"lemmacard card " + className} style={style}>
    <h2 className="lemmacard__title light valex-purple">{title || lemma.lemma}</h2>
    <div className="lemmacard__lemma huge darker-gray">{lemma.lemma}</div>
    <div className="lemmacard__comment large black-3 ml-5">{lemma.comment}</div>
    <div className="lemmacard__language black-3 ml-5">{iso639ToLang(lemma.language)}</div>
    <div className="lemmacard__meanings ml-5 mb-20">{(lemma.meanings || []).length} meanings</div>
    <Link
        to={`/app/lemmas/${lemma.id}`}
        className="card__bottom bg-valex-orange valex-highlight-orange large center">
      <span>Go to lemma</span>
      <i className="mdi mdi-arrow-right"></i>
    </Link>
  </div>
)

LemmaCard.propTypes = {
  lemma: PropTypes.object,
  title: PropTypes.string
}

LemmaCard.defaultProps = {
  lemma: {
    lemma: "Loading..."
  }
}

export default LemmaCard;
