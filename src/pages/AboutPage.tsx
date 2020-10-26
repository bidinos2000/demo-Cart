import React from 'react';
import AboutUs from '../components/about/aboutUs';
import Gallery from '../components/about/gallery';

const AboutPage = () => {
    return (
        <>
            <div className="about_area">
                <div className="container">
                    <AboutUs />
                </div>
            </div>
            <Gallery />
        </>
    )
}

export default AboutPage;