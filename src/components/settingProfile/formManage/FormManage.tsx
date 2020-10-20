import React from 'react';
import {MdVerifiedUser, MdHistory} from 'react-icons/md';
import {RiLockPasswordFill, RiDeleteBinLine} from 'react-icons/ri';
import './../formProfile/style.css';

const FormManage = () => {
    return (
        <div className="row">
            <div className="col-md-3 col-sm-3 profile-tag">
                <p style={{color:"white"}}><MdHistory className="icon-history"/><br/>History</p>
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

export default FormManage;