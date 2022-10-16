import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import "./CSS/LoginSignupPage.css"
import "./CSS/Light/LIGHTLoginSignupPage.css"
import logo from './images/transpo-scroll.png'
import sitetitle from './images/crunchywords.png'
import { useHistory } from 'react-router-dom';
import { useDropContext } from '../context/Dropdown';

const LoginSignupPage = () => {
    const { dark } = useDropContext()
    const history = useHistory()

    const redirectHome = () => {
        history.push('/')
    }


    return (
        <div className={dark ? 'LoginSignupPage_contentWrap' : 'LIGHTLoginSignupPage_contentWrap'}>
            <div className={dark ? 'LoginSignupPage_upper' : 'LIGHTLoginSignupPage_upper'}>
                <div className={dark ? 'LoginSignupPage_upper_inner' : 'LIGHTLoginSignupPage_upper_inner'}>
                    <div className={dark ? 'LoginSignupPage_logoWrap' : 'LIGHTLoginSignupPage_logoWrap'} onClick={redirectHome}>
                        <img className={dark ? 'LoginSignupPage_logo' : 'LIGHTLoginSignupPage_logo'} src={logo}></img>
                        <img className={dark ? 'LoginSignupPage_logotitle' : 'LIGHTLoginSignupPage_logotitle'} src={sitetitle}></img>
                    </div>
                </div>
            </div>
            <div className={dark ? 'LoginSignupPage_lower' : 'LIGHTLoginSignupPage_lower'}>
                <div className={dark ? 'LoginSignupPage_lower_inner' : 'LIGHTLoginSignupPage_lower_inner'}>
                    <SignUpForm />
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default LoginSignupPage;
