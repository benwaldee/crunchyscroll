import './CSS/Footer.css'
import './CSS/Light/LIGHTFooter.css'
import React, { useEffect, useState } from 'react';
import { useDropContext } from '../context/Dropdown';
const Footer = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const { dark, setDark } = useDropContext()

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    if (!isLoaded) { return (<div></div>) }
    return (
        <footer className={dark ? 'Footer_outer' : 'LIGHTFooter_outer'}>
            <div className={dark ? 'Footer_grid' : 'LIGHTFooter_grid'}>
                <div className={dark ? 'Footer_contentWrap' : 'LIGHTFooter_contentWrap'}>
                    <div className={dark ? 'Footer_contentHead' : 'LIGHTFooter_contentHead'}>Connect With Me</div>
                    <a href='https://github.com/benwaldee' target='_blank' className={dark ? 'Footer_content' : 'LIGHTFooter_content'}>Github</a>
                    <a href='https://www.linkedin.com/in/benwaldee/' target='_blank' className={dark ? 'Footer_content' : 'LIGHTFooter_content'}>LinkedIn</a>
                </div>
                <div className={dark ? 'Footer_contentWrap' : 'LIGHTFooter_contentWrap'}>
                    <div className={dark ? 'Footer_contentHead' : 'LIGHTFooter_contentHead'}>Crunchyscroll</div>
                    <a href='https://github.com/benwaldee/crunchyscroll' target='_blank' className={dark ? 'Footer_content' : 'LIGHTFooter_content'}>Codebase</a>
                    <a href='https://github.com/benwaldee/crunchyscroll/wiki/Wireframes' target='_blank' className={dark ? 'Footer_content' : 'LIGHTFooter_content'}>Wireframes</a>
                    <a href='https://github.com/benwaldee/crunchyscroll/blob/main/README.md' target='_blank' className={dark ? 'Footer_content' : 'LIGHTFooter_content'}>ReadME</a>
                </div>
                <div className={dark ? 'Footer_contentWrap' : 'LIGHTFooter_contentWrap'}>
                    <div className={dark ? 'Footer_contentHead' : 'LIGHTFooter_contentHead'}>Other Projects</div>
                    <a href='https://airbnbeep.herokuapp.com/' target='_blank' className={dark ? 'Footer_content' : 'LIGHTFooter_content'}>AirBnBeep</a>
                    <a href='https://aa-bad-reads.herokuapp.com/' target='_blank' className={dark ? 'Footer_content' : 'LIGHTFooter_content'}>Badreads</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
