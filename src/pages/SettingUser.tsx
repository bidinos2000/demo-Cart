import React from 'react';
import FormProfile from '../components/settingProfile/formProfile/FormProfile';
import FormManage from '../components/settingProfile/formManage/FormManage';
import axiosClient from './../untils/axiosClient';
import API_URL from '../constants/config';

const SettingUser = () => {
    const token = localStorage.getItem('token');
    console.log(token);
    //get infor user
    const ongetInfor = async (token:string) => {
        const abc = await axiosClient.post('https://codes-crypto-express.herokuapp.com/api/user/profile',null,{ Authorization: token});
        console.log(abc);
    }
    if(token){
        ongetInfor(token);
    }
    return (
        <div className="container main-secction">
            <div className="row">
                <div className="row user-left-part">
                    <div className="col-md-3 col-sm-3 col-xs-12 user-profil-part pull-left">
                        <FormProfile />
                    </div>
                    <div className="col-md-9 col-sm-9 col-xs-12 pull-right profile-right-section">
                        <div className="row profile-right-section-row">
                            <div className="col-md-12 profile-header">
                                <div className="row">
                                    <div className="col-md-8 col-sm-6 col-xs-6 profile-header-section1 pull-left">
                                        <h1 className="color">Profile/Setting</h1>
                                        <p style={{color:"white"}}>Senior Architect</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-8  profile-tag-section text-center">
                                        <FormManage />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingUser;