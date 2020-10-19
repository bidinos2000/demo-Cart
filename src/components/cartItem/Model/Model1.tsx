import React from 'react';
import { Modal  } from 'antd';

const Model1 = (props: any) => {
    const {handleCancel, visible, handleOk2} = props;
    return (
        <Modal
            title="Message"
            visible={visible}
            onOk={handleOk2}
            onCancel={handleCancel}
        >
            <p>You must be logged in to continue shopping!</p>
        </Modal>
    )
};

export default Model1;