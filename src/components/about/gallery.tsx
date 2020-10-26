import React from 'react';

const Gallery = () => {
    return (
        <div className="gallery_area">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                            <div className="section_title mb-70 text-center">
                                <span>Gallery Image</span>
                                <h3>Our Gallery</h3>
                            </div>
                    </div>
                </div>
            </div>
            <div className="single_gallery big_img">
                    <a className="popup-image" href="img/gallery/1.png">
                        <i className="ti-plus"></i>
                    </a>
                <img src="img/gallery/1.png" alt=""/>
            </div>
            <div className="single_gallery small_img">
                <a className="popup-image" href="img/gallery/2.png">
                    <i className="ti-plus"></i>
                </a>
                <img src="img/gallery/2.png" alt=""/>
            </div>
            <div className="single_gallery small_img">
                <a className="popup-image" href="img/gallery/3.png">
                    <i className="ti-plus"></i>
                </a>
                <img src="img/gallery/3.png" alt=""/>
            </div>
    
            <div className="single_gallery small_img">
                <a className="popup-image" href="img/gallery/4.png">
                    <i className="ti-plus"></i>
                </a>
                <img src="img/gallery/4.png" alt=""/>
            </div>
            <div className="single_gallery small_img">
                <a className="popup-image" href="img/gallery/5.png">
                    <i className="ti-plus"></i>
                </a>
                <img src="img/gallery/5.png" alt=""/>
            </div>
            <div className="single_gallery big_img">
                <a className="popup-image" href="img/gallery/6.png">
                    <i className="ti-plus"></i>
                </a>
                <img src="img/gallery/6.png" alt=""/>
            </div>
        </div>
    )
}

export default Gallery;