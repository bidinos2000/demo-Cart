import React, { FormEvent, useEffect, useState } from 'react';
import './style.css';
import {  Row, Col } from 'antd';
import {FiCheckCircle} from 'react-icons/fi';
import { connect } from 'react-redux';
import axiosClient from './../../untils/axiosClient';
import API_URL from './../../constants/config';
import { useHistory } from 'react-router';
import * as actions from './../../actions/index';

const SignInCountDown = (props: any) => {
    
    var limitTime: number = 10
    const [timeString, setTimeString] = useState(limitTime);
    const {accRegister} = props;
    useEffect(() => {
        const countDown = setInterval(() => {
            if(limitTime <= 0){
                onFinish(accRegister);
                clearInterval(countDown);
                return;
            }else {
                limitTime -= 1;
                setTimeString(limitTime);
            }
        }, 1000);
    },[]);


    
    //call api login account
    const history = useHistory();
    const [loginSuccess, setLoginSuccess] = useState(true);
    const onFinish = (value: any) => {
        axiosClient.post(`${API_URL}login`,{email: value.email,password: value.password}).then((res:any) => {
            if(res.code === 200 ) {
                setLoginSuccess(false);
                history.push('/');
                // window.location.reload();
            }
        });
    }
    props.onChangeStatus(loginSuccess);

    const onLoginNow = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onFinish(accRegister);
    }
    
    return (
		<Row>
            <Col span={24}>
                <div className="limiter">
                    <div className="container-login100 bgr1">
                        <div className="wrap-login100 p-t-30 p-b-50">
                            <form className="login100-form validate-form p-b-33 p-t-5" >
                                <span className="login100-form-title p-b-41 color-span">
                                    Register Success
                                </span>
                                <span className="icon-span">
                                    <FiCheckCircle className="icon"/>
                                </span>
                                <span className="color-span content-count">
                                    You will navigation to Home in <h4 className="count-down">{timeString}</h4> second
                                </span>
                                <div className="container-login100-form-btn m-t-32">
                                    <button className="login100-form-btn" type="submit"onClick={onLoginNow} >
                                        Login Now
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

const mapStateToProps = (state:any) => {
    return {
        accRegister: state.accRegister
    }
};


const mapDispatchToProps = (dispatch: any, props: any) => {
    return {
        onChangeStatus: (check: boolean) => {
            dispatch(actions.checkOut(check))
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SignInCountDown);