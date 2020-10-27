import React, { ChangeEvent, useEffect, useState } from 'react';
import {MdVerifiedUser, MdHistory} from 'react-icons/md';
import {RiLockPasswordFill, RiDeleteBinLine} from 'react-icons/ri';
import { Link, useHistory } from 'react-router-dom';
import './../formProfile/style.css';
import axiosClient from './../../../untils/axiosClient';
import ARI_URL from './../../../constants/configProducts';
import API_URL from './../../../constants/config';
import * as actions from './../../../actions/index';
import { connect } from 'react-redux';
import { Popconfirm, message, Drawer, Input } from 'antd';
import {WarningOutlined } from '@ant-design/icons';

const FormManage = (props:any) => {

    //get history
    const initData:Array<DataHistory> = [];
    const [dataHistory, setDataHistory] = useState(initData);

    useEffect(() => {
        axiosClient.get(`${ARI_URL}/history`).then((res:any) => {
            setDataHistory(res);
            props.getHistory(res);
        }).catch((err:any) =>{
            console.log(err);
        });
    },[])

    //detele account
    const token = localStorage.getItem('token');
    const history = useHistory();
    const confirm =  (e:any) => {
        axiosClient.post(`${API_URL}remove-account`,null, {Authorization: `Baerer ${token}`}).then((res:any)=> {
            if(res.code === 200) {
                localStorage.setItem('loginSuccess', '');
                localStorage.setItem('cart', '');
                localStorage.removeItem("token");
                localStorage.removeItem("id");
                localStorage.removeItem("dataP");
                props.onChangeStatus(true);
                props.onAddCart([]);
                props.deleteAccount(dataHistory);
                history.push('/');
                message.success("Delete Success");
            }
        }).catch((err:any) => {
            console.log(err);
        });
    }

    //show form change password
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    //change password
    const oldPass = localStorage.getItem('dataP');
    const [mess, setMess] = useState({old : '',new: '', confirm: ''});
    const [checkInput, setCheckInput] = useState(false);
    const [newPassword, setNewPassword] = useState({oldP: '', newP: '', confirmP: ''});
    //input old password
    const handleChangeOld = (e: ChangeEvent<HTMLInputElement>) => {
        if(oldPass && oldPass === e.target.value){
            setMess({...mess, old: ''});
            setNewPassword({...newPassword, oldP:e.target.value})
            setCheckInput(true);
            return;
        }else{
            setCheckInput(false);
            setMess({...mess, old: 'Old password incorrect'});
            document.getElementById('oldPassword')?.focus();
        }
        
    }

    //input new password
    const [checkNewPassword, setCheckNewPassword] = useState(false);
    const handleChangeNew = (e:ChangeEvent<HTMLInputElement>) => {
        if(!checkInput) {
            setMess({...mess, old: 'Please enter old password'});
            document.getElementById('oldPassword')?.focus();
            return;
        }else{   
            if(oldPass !== e.target.value) {
                setMess({...mess, new: ''});
                setNewPassword({...newPassword, newP : e.target.value});
                setCheckNewPassword(true);
                return;
            }else{
                    setMess({...mess, new: 'New password not match old password'});
                    setNewPassword({...newPassword, newP: ''});
                    setCheckNewPassword(false);
                    document.getElementById('newPassword')?.focus();
                    return;
            }
        }
    }

    const handleConfirnPass = (e:ChangeEvent<HTMLInputElement>) => {
        if(!checkNewPassword) {
            setMess({...mess, new: 'Please enter new password'});
            setNewPassword({...newPassword, confirmP: ''});
            document.getElementById('newPassword')?.focus();
            return;
        }else{
            if(e.target.value === newPassword.newP) {
                setMess({...mess, confirm: ''});
                setNewPassword({...newPassword, confirmP: e.target.value});
            }else{
                setMess({...mess, confirm: 'Password not match new password'});
                document.getElementById('confirm')?.focus();
                return;
            }
        }
    }

    //on submit change password
    const handleOnClickSave = () => {
        if(mess.new.length === 0 && mess.old.length === 0 && mess.confirm.length === 0){
            if(newPassword.confirmP.length > 0 ) {
                axiosClient.post(`${API_URL}change-password`, {passwordOld:newPassword.oldP, passwordNew:newPassword.confirmP}, {Authorization: `Baerer ${token}`}).then((res:any)=>{
                    localStorage.setItem('loginSuccess', '');
                    localStorage.setItem('cart', '');
                    localStorage.removeItem("token");
                    localStorage.removeItem("id");
                    localStorage.removeItem("dataP");
                    props.onChangeStatus(true);
                    props.onAddCart([]);
                    history.push('/sign-in');
                    message.success('Change Password Success!')
                }).catch((err:any) => {
                    message.error('Change Password Error!')
                    console.log(err);
                });
            }else{
                if(newPassword.oldP.length <= 0) {
                    document.getElementById('oldPassword')?.focus();
                    setMess({...mess, old: 'Please enter all input before Click Save'});
                    return;
                }else if(newPassword.newP.length <= 0) {
                    document.getElementById('newPassword')?.focus();
                    setMess({...mess, new: 'Please enter all input before Click Save'});
                    return;
                }else{
                    document.getElementById('confirm')?.focus();
                    setMess({...mess, confirm: 'Please enter all input before Click Save'});
                    return;
                }
            }
        }
    }
    return (
        <div className="row">
            <div className="col-md-3 col-sm-3 profile-tag">
                <Link to='/history-user'>
                    <p style={{color:"white"}}><MdHistory className="icon-history"/><br/>History</p>
                </Link>
            </div>
            <div className="col-md-3 col-sm-3 profile-tag">
                <Link to='/confirm-user'>
                    <p style={{color:"white"}}> <MdVerifiedUser className="icon-confirm"/><br/>Confirm</p>
                </Link>
            </div>
            <Drawer
                title="Let's Create Your New Password"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width={450}
            >
                <div className="row change-password">
                    <div className="col-md-12 col-sm-12 user-detail-section2 pull-left">
                        <p className="color-change">OLD PASSWORD</p>
                        <Input type="password" id="oldPassword" placeholder="old password" className="input-infor"  onChange={handleChangeOld}/>
                        <p style={{fontSize:"15px",fontWeight:"bold", color:"red"}}>{mess.old}</p>
                    </div>
                    <div className="col-md-12 col-sm-12 user-detail-section2 pull-right">
                        <p className="color-change">NEW PASSWORD</p>
                        <Input type="password" id="newPassword" placeholder="new password" className="input-infor" onChange={handleChangeNew}/>
                        <p style={{fontSize:"15px",fontWeight:"bold", color:"red"}}>{mess.new}</p>
                    </div>
                    <div className="col-md-12 col-sm-12 user-detail-section2 pull-right">
                        <p className="color-change">CONFIRM PASSWORD</p>
                        <Input type="password" id="confirm" placeholder="confirm password" className="input-infor" onChange={handleConfirnPass}/>
                        <p style={{fontSize:"15px",fontWeight:"bold", color:"red"}}>{mess.confirm}</p>
                    </div>
                    <div className="col-md-12 col-sm-12 user-detail-section2 pull-right">                       
                        <button className="btn btn-info req-btn" onClick={handleOnClickSave}> Save </button>
                    </div>
                </div>
            </Drawer>
            <div className="col-md-3 col-sm-3 profile-tag">
                <p style={{color:"white"}} onClick={showDrawer}><RiLockPasswordFill className="icon-history"/><br/>Change Password</p>
            </div>
            <Popconfirm
                    title="Are you sure delete account?"
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                    placement="topRight"
                    icon={<WarningOutlined style={{ color: "red", fontSize: "16px" }} />}
            >
            <div className="col-md-3 col-sm-3 profile-tag">
                    <p style={{color:"white"}}><RiDeleteBinLine className="icon-delete"/><br/>Delete Account</p>
            </div>
            </Popconfirm>
        </div>
    )
}

const mapDispatchToProps = (dispatch:any, props:any) => {
    return {
        getHistory : ( dataHistory: DataHistory) => {
            dispatch(actions.getHistory(dataHistory));
        },
        deleteAccount : (dataHistory: DataHistory) => {
            dispatch(actions.deleteAccount(dataHistory));
        },
        onChangeStatus: (check: boolean) => {
            dispatch(actions.checkOut(check))
        },
        onAddCart: (products: Array<Product>) => {
            dispatch(actions.addCart(products))
        }
    }
}

export default connect(null, mapDispatchToProps)(FormManage);