import React, { useEffect, useState } from 'react';
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
                        <Input id="oldPassword" placeholder="old password" className="input-infor"  />
                    </div>
                    <div className="col-md-12 col-sm-12 user-detail-section2 pull-right">
                        <p className="color-change">NEW PASSWORD</p>
                        <Input id="newPassword" placeholder="new password" className="input-infor" />
                    </div>
                    <div className="col-md-12 col-sm-12 user-detail-section2 pull-right">
                        <p className="color-change">CONFIRM PASSWORD</p>
                        <Input id="confirm" placeholder="confirm password" className="input-infor" />
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