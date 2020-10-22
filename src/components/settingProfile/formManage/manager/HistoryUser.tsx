import {Row, Col, Table , Image} from 'antd';
import React from 'react';
import { connect } from 'react-redux';


const { Column } = Table;
const HistoryUser = (props: any) => {
    const {history} = props;
    const data = {
        id: history.product.id,
        image: history.product.image,
        name: history.product.name,
        quantiry: history.product.quantity,
        price: history.product.price * history.product.number
    }

    console.log(data);
    return (
        <Row>
            <Col span={24}>
            <Table dataSource={history} className="table" rowKey={history.length > 0 ? "id" : "-1"}>
                <Column 
                    title="Image" 
                    dataIndex="product.image" 
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
                <Column title="Name" dataIndex="product.name" key="id" />
                <Column 
                    title="Quantity" 
                    dataIndex="product.number"
                    key="id"
                />
                <Column
                    title="Price ($)"
                    dataIndex="product.price"
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