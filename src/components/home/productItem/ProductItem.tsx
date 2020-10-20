import React from 'react';
import './style.css';
import * as actions from './../../../actions/index';
import { connect } from 'react-redux';
import * as mess from './../../../constants/message';

const ProductItem = (props: any) => {

    const {product, productAddCard} = props;
    const datas:Array<Product> = productAddCard;
    const handleOrder = () => {
        if(datas.length === 0 && product != null){
            product.number += 1;
            datas.push(product);
            mess.ADD_CART();
        }else if (datas.length > 0) {
            var checkAdd: boolean = true;
            datas.forEach((data: Product, index: number) => {
                if(data.id === product.id) {
                    data.number += 1;
                    datas.splice(index, 1, data);
                    mess.ADD_CART();
                    return checkAdd = false;;
                }
            });
            if(checkAdd) {
                product.number += 1;
                datas.push(product);
                mess.ADD_CART();
            }
        }
        localStorage.setItem('cart', JSON.stringify(datas));
        props.onAddCart(datas);
    };

    return (
        <div className="col-xl-6 col-md-6 col-lg-6">
            <div className="single_delicious d-flex align-items-center">
                <div className="thumb">
                    <img src={product.image} alt="" className="resize-img"/>
                </div>
                <div className="info">
                    <h3>{product.name}</h3>
                    <p>{product.descriptions}</p>
                    <span>${product.price}</span>
                    <button type="button" className="btn btn-primary btn-order" onClick = {handleOrder}>Order</button>
                </div>
            </div>
        </div>
    );
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);