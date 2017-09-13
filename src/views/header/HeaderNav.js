import React from 'react'
import { Link } from 'react-router-dom'

const HeaderNav = () => (
  <div className="headernav">
    <div className="header__btn">
      <Link className="resetlink mr-20" to="/app/">
        <i className="mdi mdi-view-dashboard "></i> Dashboard
      </Link>
    </div>
    <div className="header__btn">
      Lexicon <span className="very-small ml-5">&#x25BC;</span>
        <div className="headernav__sublist bg-valex-blue">
        <div className="headernav__subitem"><Link className="resetlink" to="/app/lemmas">Lemmas</Link></div>
        <div className="headernav__subitem"><Link className="resetlink" to="/app/meanings">Meanings</Link></div>
        <div className="headernav__subitem"><Link className="resetlink" to="/app/examples">Examples</Link></div>
        <div className="headernav__subitem"><Link className="resetlink" to="/app/languages">Languages</Link></div>
      </div>
    </div>
    <div className="header__btn ml-20">
      Info <span className="very-small ml-5">&#x25BC;</span>
      <div className="headernav__sublist bg-valex-blue">
        <div className="headernav__subitem"><Link className="resetlink" to="/app/info/motivations">Theoretical Motivations</Link></div>
        <div className="headernav__subitem"><Link className="resetlink" to="/app/info/about">About Valex</Link></div>
        <div className="headernav__subitem"><Link className="resetlink" to="/app/info/contact">Contact</Link></div>
        <div className="headernav__subitem"><Link className="resetlink" to="/app/info/contributor">Become a contributor</Link></div>
      </div>
    </div>
    <div className="header__btn ml-20">
      Help <span className="very-small ml-5">&#x25BC;</span>
      <div className="headernav__sublist bg-valex-blue">
        <div className="headernav__subitem"><Link className="resetlink" to="/app/help/usage">Using Valex</Link></div>
        <div className="headernav__subitem"><Link className="resetlink" to="/app/help/learning">Learning workflows</Link></div>
        <div className="headernav__subitem"><Link className="resetlink" to="/app/help/linguistic">Linguistic resources</Link></div>
      </div>
    </div>
  </div>
)

HeaderNav.propTypes = {

}

HeaderNav.defaultProps = {

}

export default HeaderNav;
