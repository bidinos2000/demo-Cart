import React from 'react';
import { Link }  from 'react-router-dom';
import {FaReact} from 'react-icons/fa';
const HomeLogo = (props:any) => {
    const {closeMobileMenu} =props;
    return (
        <Link to='/' className="navbar-logo" style={{paddingBottom: '20px', color:'white'}} onClick={closeMobileMenu}>
            <FaReact className='navbar-icon' />
            STABLE
        </Link>
    )
}

export default HomeLogo;