import React from 'react';
import {MdVerifiedUser, MdHistory} from 'react-icons/md';
import {RiLockPasswordFill, RiDeleteBinLine} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import './../formProfile/style.css';
import axiosClient from './../../../untils/axiosClient';
import ARI_URL from './../../../constants/configProducts';
import * as actions from './../../../actions/index';
import { connect } from 'react-redux';


const FormManage = (props:any) => {
    //get history
    axiosClient.get(`${ARI_URL}/history`).then((res:any) => {
        props.getHistory(res);
    }).catch((err:any) =>{
        console.log(err);
    });
    return (
        <div className="row">
            <div className="col-md-3 col-sm-3 profile-tag">
                <Link to='/history-user'>
                    <p style={{color:"white"}}><MdHistory className="icon-history"/><br/>History</p>
                </Link>
            </div>
            <div className="col-md-3 col-sm-3 profile-tag">
                <p style={{color:"white"}}> <MdVerifiedUser className="icon-confirm"/><br/>Confirm</p>
            </div>
            <div className="col-md-3 col-sm-3 profile-tag">
                <p style={{color:"white"}}><RiLockPasswordFill className="icon-history"/><br/>Change Password</p>
            </div>
            <div className="col-md-3 col-sm-3 profile-tag">
                <p style={{color:"white"}}><RiDeleteBinLine className="icon-delete"/><br/>Delete Account</p>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch:any, props:any) => {
    return {
        getHistory : ( dataHistory: DataHistory) => {
            dispatch(actions.getHistory(dataHistory));
        }
    }
}
export default connect(null, mapDispatchToProps)(FormManage);