
import React from 'react';
import './CSS/Footer.css'

const Footer = () => {


    return (
        <footer className='Footer_outer'>
            <div className='Footer_grid'>
                <div className='Footer_contentWrap'>
                    <div>Connect With Me</div>
                    <a>Github</a>
                    <a>LinkedIn</a>
                </div>
                <div className='Footer_contentWrap'>
                    <div>Crunchyscroll</div>
                    <a>Codebase</a>
                    <a>Wireframes</a>
                    <a>ReadME</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
