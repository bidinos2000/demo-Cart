import { Col, Row } from 'antd';
import React from 'react';
import CartContent from '../components/cartItem/CartContent';

const CartPage = () => {
    return (
        <div className="best_burgers_area bg-cart">
            <Row>
                <Col span={24}>
                    <CartContent />
                </Col>
            </Row>
        </div>
    )
}

export default CartPage;