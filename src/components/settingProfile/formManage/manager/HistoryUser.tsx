import {Row, Col, Table , Image} from 'antd';
import React from 'react';
import './style.css';

const { Column } = Table;
const HistoryUser = (props: any) => {
    const newData: Array<Historys> = [];
    const local = localStorage.getItem('history');
    const dataLocal = local ? JSON.parse(local) : [];
    if(dataLocal.length > 0) {
        let termList: Historys = {
            id: '',
            image: '',
            name: '',
            date: '',
            quantity: 0,
            price: 0
        }
        dataLocal.forEach((data:DataHistory, index:number) => {
            termList = {
                id : data.idRandom,
                image: data.product.image,
                name: data.product.name,
                date: data.date,
                quantity: data.product.number,
                price: data.product.number * data.product.price
            }
            newData.push(termList);
        });
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
                        title="Quantity" 
                        dataIndex="quantity"
                        key="id"
                    />
                    <Column
                        title="ToTal Price ($)"
                        dataIndex="price"
                        key="id"
                    />
                </Table>
            </Col>
        </Row>
    )
}


export default HistoryUser;