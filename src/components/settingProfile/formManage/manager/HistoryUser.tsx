import {Row, Col, Table , Image} from 'antd';
import React from 'react';
import { connect } from 'react-redux';


const { Column } = Table;
const HistoryUser = (props: any) => {
    const {history} = props;
    const newData: Array<Historys> = [];

    if(history.length > 0) {
        let termList: Historys = {
            id: '',
            image: '',
            name: '',
            date: '',
            quantity: 0,
            price: 0
        }
        history.forEach((data:DataHistory, index:number) => {
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

const mapStateToProps = (state:any) => {
    return {
        history: state.history
    }
}

export default connect(mapStateToProps, null)(HistoryUser);