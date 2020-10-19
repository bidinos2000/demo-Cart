import React from 'react';
import { Modal  } from 'antd';

const ModelAll = (props: any) => {
    const {handleCancel,
            handleOk, 
            visible, 
            stringMess, 
            stringTitle, 
            handleOk1, 
            checkButton} = props;
    return (
        <Modal
            title={stringTitle}
            visible={visible}
            onOk={checkButton ? handleOk1 : handleOk}
            onCancel={handleCancel}
        >
            <p>{stringMess}</p>
        </Modal>
    )
};

export default ModelAll;