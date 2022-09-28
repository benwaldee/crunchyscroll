import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import "./CSS/LoginSignupPage.css"
import logo from './images/transpo-scroll.png'
import sitetitle from './images/crunchywords.png'
import { useHistory } from 'react-router-dom';

const LoginSignupPage = () => {
    const history = useHistory()

    const redirectHome = () => {
        history.push('/')
    }


    return (
        <div className='LoginSignupPage_contentWrap'>
            <div className='LoginSignupPage_upper'>
                <div className='LoginSignupPage_upper_inner'>
                    <div className='LoginSignupPage_logoWrap' onClick={redirectHome}>
                        <img className='LoginSignupPage_logo' src={logo}></img>
                        <img className='LoginSignupPage_logotitle' src={sitetitle}></img>
                    </div>
                </div>
            </div>
            <div className='LoginSignupPage_lower'>
                <div className='LoginSignupPage_lower_inner'>
                    <SignUpForm />
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default LoginSignupPage;
