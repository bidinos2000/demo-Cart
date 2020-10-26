import React, { ChangeEvent, useState } from 'react';
import { Table, Button , Image} from 'antd';
import './style.css';
import * as actions from './../../actions/index';
import { connect } from 'react-redux';
import { FiNavigation2 } from 'react-icons/fi';
import ModelAll from './Model/Model';
import { useHistory } from 'react-router';
import * as mess from './../../constants/message';
import Model1 from './Model/Model1';
import ARI_URL from './../../constants/configProducts';
import axiosClient from './../../untils/axiosClient';
import monent from 'moment';

const { Column } = Table;

const CartContent = (props: any) => {
    const {productAddCard} = props;
    var dataCart : Array<Product> = productAddCard;

    //handle user add product in tag input
    const [cartItem, setCartItem] = useState({
        id: '',
        name: '',
        descriptions: '',
        price: 0,
        quantity: 0,
        image: '',
        status: false,
        number: 0
    });
    const [number, setNumber] = useState(0);
    const [id, setId] = useState('');
    const [checkCart, setCheckCart] = useState(true);
    //input 2
    const handleInputNumber = (e:ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if(!isNaN(value) && value > 0) {
            setNumber(value);
            setCheckCart(true);
            props.onUpdate(dataCart, cartItem, parseInt(e.target.value));
        }else{
            setCheckCart(false);
            setNumber(-1);
            return;
        }
    }

    const handleOnFocus = (data: any) => {
        setCartItem(data);
    }

    const onBlur = () => {
        if(number < 0) {
            setVisible(true);
            setStringMess('Are you want to Delete product onto the Cart?');
            setStringTitle('Warning');
            setCheckButton(false);
        }
        const idProductInCart = cartItem.id;
        setId(idProductInCart);
    }

    //calculator total price 
    const totalPrice = () => {
        let totalPrice = 0;
        dataCart.forEach(data => {
            totalPrice += (data.price * data.number);
        });
        return totalPrice;
    }
    

    //handle remove product to cart
    const [visible, setVisible] = useState(false);
    const [stringMess, setStringMess] = useState('');
    const [stringTitle, setStringTitle] = useState('');
    const [checkButton, setCheckButton] = useState(false);

    const handleOnDelete = (e:any) => {
        setVisible(true);
        setStringMess('Are you sure Delete product onto the Cart?');
        setStringTitle('Warning');
        setCheckButton(false);
        const idProductInCart = e.currentTarget.value;
        setId(idProductInCart);
    }
    
    const handleOk = () => {
        props.onDelete(id);
        setVisible(false);
    }

    const handleCancel = () => {
        setVisible(false);
        setVisible1(false);
    }

    //check process checkout
    const history = useHistory();
    const [visibale1, setVisible1] = useState(false);
    const checkProcessCheckOut = () => {
        if(checkCart) {
            if(dataCart.length <= 0) {
                setVisible(true);
                setStringMess('Cart empty you want to comeback Home?');
                setStringTitle('Message');
                setCheckButton(true);
            }else{
                const checkLogin = localStorage.getItem('loginSuccess');
                if(!checkLogin) {
                    console.log('fail')
                    setVisible1(true);
                }else{
                    //format date
                    const time  = monent().format('MMM Do YYYY, h:mm:ss a');
                    //random id
                    let s4 = () => {
                        return Math.floor((1+ Math.random()) * 0x10000).toString(16).substring(1);
                    }
                    let generateId = () => {
                        return s4() + s4() + '-' + s4() + '-' + s4() + s4() + '-' + s4()
                    }
                    let idUser = localStorage.getItem('id');               
                    dataCart.forEach((cart:Product, index:number) => {
                        axiosClient.post(`${ARI_URL}history`, {date: time, idUser:idUser, product:cart, idRandom:generateId()}).then((res:any) =>{

                        }).catch((err:any) => {
                            mess.CHECK_OUT_FAIL();
                            console.log(err);
                            return;
                        });
                    });
                    mess.CHECK_OUT();
                    history.push('/');
                    localStorage.setItem('cart', '');
                    props.onAddCart([]);
                }
            }
        }else{
            mess.CHECK_QUANTITY();
            document.getElementById(id)?.focus();
        }
    }

    
    const handleCancel1 = () => {
        document.getElementById(id)?.focus();
        setVisible(false);
    }


    const handleOk1 = () => {
        history.push('/');
        setVisible(false);
    }

    const handleOk2 = () => {
        history.push('/sign-in');
        setVisible(false);
    }

    return (
        <>
            <Table dataSource={dataCart} className="table" rowKey={dataCart.length > 0 ? "id" : "-1"}>
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
                <Column 
                    title="Quantity" 
                    dataIndex="number"
                    key="id"
                    render = {(dataIndex, record: Product) => (
                            <div className="input-group" >
                                <input min={1}
                                    onBlur={onBlur} 
                                    onFocus={() => handleOnFocus(record)} 
                                    onChange={handleInputNumber} 
                                    type="number"
                                    id={record.id}
                                    className="form-control input-number" 
                                    defaultValue={dataIndex}
                                    style={{width:"30px",marginBottom:"5px"}}/>
                            </div>
                        )
                    }
                />
                <Column
                    title="Price ($)"
                    dataIndex="price"
                    key="id"
                />
                <Column
                    title="Action"
                    key="id"
                    dataIndex="id"
                    render={(dataIndex, record: any) => (
                        <Button type="primary" value={dataIndex} danger onClick={handleOnDelete}>Delete</Button>
                    )}
                />
            </Table>
            <ModelAll 
                handleOk={handleOk} 
                handleOk1={handleOk1}
                handleCancel1={handleCancel1}
                handleCancel={handleCancel} 
                checkButton={checkButton}
                checkCart = {checkCart}
                visible={visible}
                stringMess={stringMess}
                stringTitle={stringTitle}
            />
            <Model1 visible={visibale1} handleOk2={handleOk2} handleCancel={handleCancel}/>
            <div className="total-cart"><h3>Total: {totalPrice()}$ </h3>
            <br></br>
            <button 
                type="button" 
                className="btn btn-primary btn-checkOut" 
                onClick={checkProcessCheckOut} 
            >
                Process CheckOut<FiNavigation2  className="icon-checkOut"/>
            </button>
            </div>
        </>
    )
}

const mapStateToProps = (state:any) => {
    return {
        productAddCard: state.productAddCard
    }
};


const mapDispatchToProps = (dispatch: any, props: any) => {
    return {
        onAddCart: (products: Array<Product>) => {
            dispatch(actions.addCart(products))
        },
        onDelete: (id: any) => {
            dispatch(actions.deleteCart(id));
        },
        onUpdate: (list: Array<Product>, product: Product, quantity: number) => {
            dispatch(actions.updateCart(list,product, quantity));
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(CartContent);