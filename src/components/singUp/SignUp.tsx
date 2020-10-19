import React, { ChangeEvent, FormEvent, useState } from 'react';
import 'antd/dist/antd.css';
import {  Row, Col } from 'antd';
import axiosClient from '../../untils/axiosClient';
import './style.css';
import * as checks from '../../constants/checks';
import * as mss from  './../../constants/message';
import API_URL from './../../constants/config';
import { useHistory } from 'react-router';
import * as actions from './../../actions/index';
import { connect } from 'react-redux';

const SignUpContent = (props: any) => {
    const history = useHistory();
    const [account, setAccount] = useState({email: '', password: '', passwordTerm: ''});
    //message form
    const initialMess: MessRegister = {
        messEmail: '',
        messPassword: '',
        messConfirm: '',
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
    const handlePassword = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length > 0) {
            setMessForm({
                ...messForm,
                messPassword: '', 
            })
        }else{
            setMessForm({
                ...messForm,
                messPassword: 'You must enter Password', 
            })
        }
        setAccount({...account,passwordTerm: e.target.value});
    }

    //confirm password
    const handleConfirmPassword = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if(value === account.passwordTerm) {
            setMessForm({
                ...messForm,
                messConfirm: ''
            })
            setAccount({...account,password: value});
        }else{
            setMessForm({
                ...messForm,
                messConfirm: 'Password not match!'
            })
            return;
        }
        
    }

    //call api login account
    const onFinish = (value: any) => {
        axiosClient.post(`${API_URL}register`,{email: value.email,password: value.password}).then((res:any) => {
            if(res.code === 200 ) {
                mss.RGT_SUCCESS();
                props.onRegisterSuccess({email: account.email, password: account.password})
                history.push('/sign-up-success');
                // window.location.reload();
            }else if(res.code === 500){
                mss.RGT_FAIL();
            }
        });
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
        }else if(account.passwordTerm === "") {
            document.getElementById('pass')?.focus();
            setMessForm({
                ...messForm,
                messPassword: 'You must enter Password here!', 
            })
            return;
        }else if (account.password === ""){
            document.getElementById('passconfirm')?.focus();
            setMessForm({
                ...messForm,
                messConfirm: 'Pleate confirm password again!', 
            })
            return;
        } else{
            onFinish(account);
        }

    }


    return (
        <Row>
            <Col span={24}>
                <div className="limiter">
                    <div className="container-login100 bgr-register">
                        <div className="wrap-login100 p-t-30 p-b-50">
                            <span className="login100-form-title p-b-41">
                                Register Account
                            </span>
                            <form className="login100-form validate-form p-b-33 p-t-5" >
                                <div className="wrap-input100 validate-input" data-validate = "Enter username">
                                    <input id="email" className="input100" type="text" name="username" placeholder="E-mail" onChange={handleEmail}/>
                                    <span className="focus-input100" data-placeholder="&#xe82a;"></span>
                                    <span className='form-mss'>{messForm.messEmail}</span>
                                </div>

                                <div className="wrap-input100 validate-input" data-validate="Enter password">
                                    <input id="pass" className="input100" type="password" name="pass" placeholder="Password" onChange={handlePassword}/>
                                    <span className="focus-input100" data-placeholder="&#xe80f;"></span>
                                    <span className='form-mss'>{messForm.messPassword}</span>
                                </div>
                                
                                <div className="wrap-input100 validate-input" data-validate="Confirm password">
                                    <input id="passconfirm" className="input100" type="password" name="pass" placeholder="Confirm password" onChange={handleConfirmPassword}/>
                                    <span className="focus-input100" data-placeholder="&#xe80f;"></span>
                                    <span className='form-mss'>{messForm.messConfirm}</span>
                                </div>

                                <div className="container-login100-form-btn m-t-32">
                                    <button className="login100-form-btn" type="submit" onClick= {handleSubmit}>
                                        Register Now
                                    </button>
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

const mapDispatchToProps = (dispatch: any, props: any) => {
    return {
        onRegisterSuccess: (accRegister: Acc) => {
            dispatch(actions.registerSuccess(accRegister))
        }
    }
}


export default connect(null, mapDispatchToProps)(SignUpContent);