import React, { useState } from 'react';
import { Link }  from 'react-router-dom';
import {FaBars, FaTimes} from 'react-icons/fa';
import {IconContext} from 'react-icons/lib';
import { Button } from '../customButton/Button';
import './Navbar.css';
import HomeLogo from './homeLogo/homeLogo';
import { connect } from 'react-redux';
import * as actions from './../../../actions/index';
import Avatar from 'antd/lib/avatar/avatar';
import {GithubOutlined} from '@ant-design/icons';

const listMenu: Array<Menus> = [
    {
        name: 'Home',
        to: '/',
        exact: true,
        icon: ''
    },
    {
        name: 'About',
        to: '/about',
        exact: false,
        icon: ''
    },
    {
        name: 'Cart',
        to: '/cart',
        exact: false,
        icon: ''
    },
    {
        name: 'Sign In',
        to: '/sign-in',
        exact: false,
        icon: ''
    },
];

const Navbar = (props:any) => {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    //check log-out
    const {checkOut} = props;

    if(!checkOut) {
        localStorage.setItem('loginSuccess', '0');
    }

    const closeLogOut = () => {
        setClick(false);
        localStorage.setItem('loginSuccess', '');
        localStorage.setItem('cart', '');
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        props.onChangeStatus(true);
        props.onAddCart([]);
    }

    //resize show button menu
    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false)
        }else {
            setButton(true);
        }
    }
    window.addEventListener('resize', showButton);

    //show menu
    const showMenu = () => {
        var result = null;
        if(listMenu.length  > 0) {
            result = listMenu.map((menu:Menus) => {
                return (
                    menu.name !== 'Sign In' && menu.name !== 'Sign Up'? (
                        <li  className='nav-item' key={menu.to}>
                            <Link to={menu.to} className="nav-links" style={{color:'white'}} onClick={closeMobileMenu}>
                                {menu.name}
                            </Link>
                        </li>
                    ) : (
                        localStorage.getItem('loginSuccess') !== '0' ? (
                        <li className="nav-btn" key={menu.to}>
                            {button ? (
                                <Link  to={menu.to} className="btn-link" onClick={closeMobileMenu}>
                                    <Button buttonStyle="btn-outline">{menu.name}</Button>
                                </Link>
                            ) : (
                                <Link to={menu.to} className="btn-link">
                                    <Button buttonStyle="btn-outline"
                                        buttonSize="btn-mobile"
                                        onClick={closeMobileMenu}
                                >{menu.name}</Button>
                                </Link>
                            )}
                        </li>
                        ) : (
                            <li className="nav-btn" key={menu.to}>
                                {button ? (
                                    <ul className="nav navbar-nav menu-user">
                                        <li>
                                            <span className="dropdown-toggle" data-toggle="dropdown"><Avatar className="user-icon" size={48} icon={<GithubOutlined />} /></span>
                                                <ul className="dropdown-menu drop-menu">
                                                    <li>
                                                        <Link  to='/setting-user' className="btn-link" onClick={closeMobileMenu}>
                                                            <Button buttonStyle="btn-outline">Profile</Button>
                                                        </Link>
                                                    </li>
                                                    <li className="divider"></li>
                                                        <Link  to='/' className="btn-link" onClick={closeLogOut}>
                                                            <Button buttonStyle="btn-outline">Sign Out</Button>
                                                        </Link>
                                                    <li className="divider"></li>
                                                </ul>
                                        </li>
                                    </ul>
                                ) : (
                                    <ul className="nav navbar-nav menu-user">
                                        <li>
                                            <span className="dropdown-toggle" data-toggle="dropdown"> <Avatar className="user-icon" size={48} icon={<GithubOutlined />} /></span>
                                                <ul className="dropdown-menu drop-menu">
                                                    <li>
                                                        <Link to='/setting-user' className="btn-link" onClick={closeMobileMenu}>
                                                            <Button buttonStyle="btn-outline"
                                                                buttonSize="btn-mobile"
                                                            >Profile</Button>
                                                        </Link>
                                                    </li>
                                                    <li className="divider"></li>
                                                    <li>
                                                        <Link to='/' className="btn-link">
                                                            <Button buttonStyle="btn-outline"
                                                                buttonSize="btn-mobile"
                                                                onClick={closeLogOut}
                                                            >Sign Out</Button>
                                                        </Link>
                                                    </li>
                                                    <li className="divider"></li>
                                                </ul>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        )
                    )
                );
            }); 
        }
        return result;
    };

    return (
        <>
            <IconContext.Provider value={{color:'#fff'}}>
                <div className="navbar">
                    <div className="navbar-container container">
                        <HomeLogo closeMobileMenu={closeMobileMenu}/>
                        <div className="menu-icon" onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </div>
                        <ul className={click ? 'nav-menu active': 'nav-menu'}>
                            {showMenu()}
                        </ul>
                    </div>
                </div>
            </IconContext.Provider>
        </>
    )
}

const mapStateToProps = (state:any) => {
    return {
        checkOut: state.checkOut
    }
};

const mapDispatchToProps = (dispatch: any, props: any) => {
    return {
        onChangeStatus: (check: boolean) => {
            dispatch(actions.checkOut(check))
        },
        onAddCart: (products: Array<Product>) => {
            dispatch(actions.addCart(products))
        }
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(Navbar);