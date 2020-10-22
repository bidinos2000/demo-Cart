import React, { useEffect, useState } from 'react';
import "./style.css";
import { GithubOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { Input } from 'antd';
import { connect } from 'react-redux';
import * as actions from './../../../actions/index';
import axiosClient from './../../../untils/axiosClient';
import API_URL from '../../../constants/config';
import * as mess from './../../../constants/message';
const FormProfile = (props: any) => {
    const { dataInfor } = props;
    const token = localStorage.getItem('token');
    
    //get infor
    const [getFirstName, setFirstName] = useState();
    const [getLastName, setLastName] = useState();
    const [getAddress, setAddress] = useState();
    useEffect(() => {
        if (dataInfor) {
            setFirstName(dataInfor.firstName);
            setLastName(dataInfor.lastName);
            setAddress(dataInfor.address);
        }
    }, [dataInfor]);

    //handle input
    const handleFirstName = (e: any) => {
        setFirstName(e.target.value);
        dataInfor.firstName = e.target.value
    }

    const handleLastName = (e:any) => {
        setLastName(e.target.value);
        dataInfor.lastName = e.target.value
    }

    const handleAddress = (e:any) => {
        setAddress(e.target.value);
        dataInfor.address = e.target.value
    }
    
    //handle save change infor
    const handleSaveUpdateInfor = async () => {
        console.log(dataInfor);
        await axiosClient.post(`${API_URL}user/update`,{email:dataInfor.email, firstName:dataInfor.firstName, lastName: dataInfor.lastName, address: dataInfor.address},
        {Authorization: `Bearer ${token}`}).then((res:any)=>{
            if(res.code === 200){
                mess.UPDATE_INFOR_SUCCESS();
            }else{
                mess.UPDATE_INFOR_FAIL();
            }
        });
    }

    props.onUpdate(dataInfor)
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
                    <Input id="firstName" placeholder="First Name" className="input-infor" onChange={handleFirstName} value={getFirstName} />
                </div>
                <div className="col-md-12 col-sm-12 user-detail-section2 pull-right">
                    <div className="border"></div>
                    <p className="color">LAST NAME</p>
                    <Input id="lastName" placeholder="Last Name" className="input-infor" onChange={handleLastName} value={getLastName} />
                </div>
            </div>
            <div className="col-md-12 user-detail-section2">
                <div className="border"></div>
                <p className="color">ADDRESS</p>
                <Input placeholder="Your Address" className="input-infor" onChange={handleAddress} value={getAddress}/>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-6 profile-header-section1 text-right pull-rigth btn-save">
                <button className="btn btn-info req-btn" onClick={handleSaveUpdateInfor}> Save</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        dataInfor: state.dataInfor
    }
}

const mapDispatchToProps = (dispatch: any, props: any) => {
    return {
        onUpdate: (data: DataInfor) => {
            dispatch(actions.updateInfor(data));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FormProfile);