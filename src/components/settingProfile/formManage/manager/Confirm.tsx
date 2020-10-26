import React, { ChangeEvent } from 'react';
import {Row, Col, Table , Image, Checkbox} from 'antd';
import './style.css';
import { connect } from 'react-redux';
import * as actions from './../../../../actions/index';

const { Column } = Table;
const Confirm = (props:any) => {
    const newData: Array<Confirm> = [];
    const local = localStorage.getItem('history');
    const dataLocal = local ? JSON.parse(local) : [];

    if(dataLocal.length > 0) {
        let termList: Confirm = {
            id: '',
            image: '',
            name: '',
            date: '',
            status: false,
        }
        dataLocal.forEach((data:DataHistory, index:number) => {
            termList = {
                id : data.idRandom,
                image: data.product.image,
                name: data.product.name,
                date: data.date,
                status: data.product.status,
            }
            newData.push(termList);
        });
    }

    const onChange = (record:any) => {
        if(dataLocal.length > 0) {
            dataLocal.forEach((data:DataHistory, index:any) => {
                if(data.idRandom === record.id){
                    data.product.status = !data.product.status;
                }
            });
        }
        props.confirmReceive(dataLocal);
    }



    return (
        <Row>
            <Col span={24}>
                <Table dataSource={newData} className="table" rowKey={newData.length > 0 ? "id" : "-1"}>
                    <Column 
                        title="Image" 
                        dataIndex="image" 
                        key="id"
                        render = {(dataIndex, record) => (
                                <Image
                                    width={100}
                                    height={100}
                                    src="error"
                                    fallback={dataIndex}
                                />
                            )
                        }
                    />
                    <Column title="Name" dataIndex="name" key="id" />
                    <Column title="Time Order" dataIndex="date" key="id" />
                    <Column 
                        title="Confirm Receive" 
                        dataIndex="status"
                        key="id"
                        render = {(dataIndex, record) => (
                                <Checkbox defaultChecked={dataIndex} onChange={() => onChange(record)}>Received</Checkbox>
                            ) 
                        }
                    />
                </Table>
            </Col>
        </Row>
    )
}


const mapDispatchToProps = (dispatch:any, props:any) => {
    return {
        confirmReceive: (products: Array<DataHistory>) => {
            dispatch(actions.confirmReceive(products))
        }
    }
}

export default connect(null, mapDispatchToProps)(Confirm);