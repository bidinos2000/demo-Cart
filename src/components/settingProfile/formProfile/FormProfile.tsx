import React from 'react';
import "./style.css";
import {GithubOutlined} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { Input } from 'antd';

const FormProfile = () => {
    return (
        <div className="row ">
            <div className="col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center">
                <Avatar className="user-icon" size={100} icon={<GithubOutlined />} />
            </div>
            <div className="col-md-12 col-sm-12 col-xs-12 user-detail-section1 text-center">
                <span className="follow "><i className="fa fa-user-o" aria-hidden="true"></i> Information</span>
            </div>
            <div className="row user-detail-row">
                <div className="col-md-12 col-sm-12 user-detail-section2 pull-left">
                <div className="border"></div>
                    <p className="color">FIRST NAME</p>
                    <Input placeholder="First Name" className="input-infor"/>
                </div>
                <div className="col-md-12 col-sm-12 user-detail-section2 pull-right">
                    <div className="border"></div>
                    <p className="color">LAST NAME</p>
                    <Input placeholder="Last Name" className="input-infor"/>
                </div>
            </div>
            <div className="col-md-12 user-detail-section2">
                <div className="border"></div>
                <p className="color">ADDRESS</p>
                <Input placeholder="Your Address" className="input-infor"/>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-6 profile-header-section1 text-right pull-rigth btn-save">
                <button className="btn btn-info req-btn"> Save</button>                          
            </div>
        </div>
    )
}

export default FormProfile;