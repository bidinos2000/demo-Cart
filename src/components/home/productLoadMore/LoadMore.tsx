import React, { useState } from 'react';
import './../home.css';

const LoadMore = (props: any) => {
    const {products} = props;

    const [limitSize, setLimitSize] = useState(4);
    const {limitLoad} = props;

    const onHandleLimit = () => {
        const newLimit = limitSize + 4;
        setLimitSize(newLimit);
        if(newLimit >= products.length) {
            setLimitSize(products.length);
            var btnRemove = document.getElementById('btn-loadmore');
            btnRemove?.parentNode?.removeChild(btnRemove);
        }
    }
    limitLoad(limitSize)
    return (
        <div className="row row-loadmore">
            <div className="col-lg-12">
                <div className="iteam_links">
                    <button className="boxed-btn5 btn-load" id="btn-loadmore" onClick ={onHandleLimit}>More Items</button>
                </div>
            </div>
        </div>
    );
}

export default LoadMore;