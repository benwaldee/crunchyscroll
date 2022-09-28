
import React from 'react';
import './CSS/Footer.css'

const Footer = () => {


    return (
        <footer className='Footer_outer'>
            <div className='Footer_grid'>
                <div className='Footer_contentWrap'>
                    <div className='Footer_contentHead'>Connect With Me</div>
                    <a href='https://github.com/benwaldee' target='_blank' className='Footer_content'>Github</a>
                    <a href='https://www.linkedin.com/in/benwaldee/' target='_blank' className='Footer_content'>LinkedIn</a>
                </div>
                <div className='Footer_contentWrap'>
                    <div className='Footer_contentHead'>Crunchyscroll</div>
                    <a href='https://github.com/benwaldee/crunchyscroll' target='_blank' className='Footer_content'>Codebase</a>
                    <a href='https://github.com/benwaldee/crunchyscroll/wiki/Wireframes' target='_blank' className='Footer_content'>Wireframes</a>
                    <a href='https://github.com/benwaldee/crunchyscroll/blob/main/README.md' target='_blank' className='Footer_content'>ReadME</a>
                </div>
                <div className='Footer_contentWrap'>
                    <div className='Footer_contentHead'>Other Projects</div>
                    <a href='https://airbnbeep.herokuapp.com/' target='_blank' className='Footer_content'>AirBnBeep</a>
                    <a href='https://aa-bad-reads.herokuapp.com/' target='_blank' className='Footer_content'>Badreads</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
