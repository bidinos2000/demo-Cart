import React, {ChangeEvent, FormEvent, useState} from 'react';
import 'antd/dist/antd.css';
import {  Row, Col } from 'antd';
import axiosClient from '../../untils/axiosClient';
import * as mss from  './../../constants/message';
import API_URL from './../../constants/config';
import './style.css';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import * as checks from '../../constants/checks';
import * as actions from './../../actions/index';
import { connect } from 'react-redux';


const SignInContent = (props: any) => {
    const [account, setAccount] = useState({email: '', password: ''});
    const history = useHistory();
    const [loginSuccess, setLoginSuccess] = useState(true);

    //call api login account
    const onFinish = (value: any) => {
        axiosClient.post(`${API_URL}login`,{email: value.email,password: value.password}).then((res:any) => {
            if(res.code === 200 ) {
                localStorage.setItem('token', JSON.stringify(res.token));
                setLoginSuccess(false);
                history.push('/');
            }else if(res.code === 400){
                mss.ERROR_ACCOUNT();
            }else{
                mss.ERROR_PASSWORD();
            }
        });
    }

    //check login success
    props.onChangeStatus(loginSuccess);

    //message form
    const initialMess: Mess = {
        messEmail: '',
        messPassword: '',
    }
    const [messForm, setMessForm]= useState(initialMess);

    //username
    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        var mess = checks.isEmail(e.target.value);
        if(mess === undefined) {
            setMessForm({
                ...messForm,
                messEmail: '',
            });
            setAccount({...account,email: e.target.value});
        }else{
            setMessForm({
                ...messForm,
                messEmail: mess
            });
        }
    }

    //password
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length > 0) {
            setMessForm({
                ...messForm,
                messPassword: '', 
            })
            setAccount({...account,password: e.target.value});
        }else{
            setMessForm({
                ...messForm,
                messPassword: 'You must enter Password', 
            })
        }
    }

    //submit form
    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(account.email === "" ) {
            document.getElementById('email')?.focus();
            setMessForm({
                ...messForm,
                messEmail: 'You must enter E-mail here!', 
            });
            return;
        }else if(account.password === "") {
            document.getElementById('pass')?.focus();
            setMessForm({
                ...messForm,
                messPassword: 'You must enter Password here!', 
            })
            return;
        }else{
            onFinish(account)
        }
    }

    return (
        <Row>
            <Col span={24}>
                <div className="limiter">
                    <div className="container-login100 bgr">
                        <div className="wrap-login100 p-t-30 p-b-50">
                            <span className="login100-form-title p-b-41">
                                Account Login
                            </span>
                            <form className="login100-form validate-form p-b-33 p-t-5" >
                                <div className="wrap-input100 validate-input" data-validate = "Enter username">
                                    <input id="email" className="input100" type="text" name="username" placeholder="E-mail" onChange={handleEmail}/>
                                    <span className="focus-input100" data-placeholder="&#xe82a;"></span>
                                    <span className='form-mss'>{messForm.messEmail}</span>
                                </div>

                                <div className="wrap-input100 validate-input" data-validate="Enter password">
                                    <input id="pass" className="input100" type="password" name="pass" placeholder="Password" onChange={handlePassword} />
                                    <span className="focus-input100" data-placeholder="&#xe80f;"></span>
                                    <span className='form-mss'>{messForm.messPassword}</span>
                                </div>

                                <div className="container-login100-form-btn m-t-32">
                                    <button className="login100-form-btn" type="submit" onClick={handleSubmit}>
                                        Login
                                    </button>
                                </div>

                                <div className='link-register'>
                                    Not registered? <Link to='/sign-up'>Create an account!</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div id="dropDownSelect1"></div>
            </Col>
        </Row>
    );
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
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignInContent);