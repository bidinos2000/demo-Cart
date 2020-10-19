import React from 'react';
import HomeContent from '../components/home/HomeContent';
const HomePage = () => {
    return (
        <div className="best_burgers_area">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section_title text-center mb-80">
                        <span>Burger Menu</span>
                        <h3>Best Ever Burgers</h3>
                    </div>
                </div>
            </div>
            <HomeContent />

        </div>
    </div>
    )
}

export default HomePage;