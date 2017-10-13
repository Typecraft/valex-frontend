import React from 'react'
import { Link } from 'react-router-dom'

import chevronGray from 'assets/chevron-gray.svg'

export const HeaderNav = () => (
  <div className="headernav header-gray">
    <div className="header__btn">
      <Link className="resetlink" to="/app/lexicon">
        Lexicon
      </Link>
    </div>
    <div className="header__btn ml-20">
      Info <img className="chevron__down" src={chevronGray} alt="" />
      <div className="headernav__sublist">
        <div className="headernav__subitem"><Link className="resetlink" to="/app/info/motivations">Theoretical Motivations</Link></div>
        <div className="headernav__subitem"><Link className="resetlink" to="/app/info/about">About Valex</Link></div>
        <div className="headernav__subitem"><Link className="resetlink" to="/app/info/contact">Contact</Link></div>
        <div className="headernav__subitem"><Link className="resetlink" to="/app/info/contributor">Become a contributor</Link></div>
      </div>
    </div>
    <div className="header__btn ml-20">
      Help <img className="chevron__down" src={chevronGray} alt="" />
        <div className="headernav__sublist">
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
