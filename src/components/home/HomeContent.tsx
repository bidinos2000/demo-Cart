import React, { useEffect, useState } from 'react';
import ProductItem from './productItem/ProductItem';
import axiosClient from '../../untils/axiosClient';
import ARI_URL from './../../constants/configProducts';
import './home.css';
import LoadMore from './productLoadMore/LoadMore';
const initProducts: Array<Product> = [{
    id: '',
    name: '',
    descriptions: '',
    price: 0,
    quantity: 0,
    image: '',
    status: false,
    number: 0,
}];

const HomeContent = () => {

    const [products, setProducts] = useState(initProducts);
    const [limit, setLimit]  = useState(0);
    //call api login account
    useEffect(() => {
        axiosClient.get(`${ARI_URL}products`, null).then((res: any) => {
            if (res.length > 0) {
                setProducts(res);
            }
        });
    },[]);
    
    //load more and show products
    const limitLoad = (value: number) => {
        setLimit(value);

    }
    
    const showProducts = () => {
        var newProducts = products.slice(0, limit);
        var result = null;
        result = newProducts.map((product: Product, index: number) => {
            return <ProductItem product={product} key ={index}/>
        });
        return result;
    }

    return (
        <div className="row">
            {showProducts()}
            <LoadMore products={products} limitLoad={limitLoad}/>
        </div>
    );
}

export default HomeContent;