import "./CSS/FourOhFour.css"
import { useHistory } from 'react-router-dom';
import { useDropContext } from '../context/Dropdown';

const FourOhFour = () => {
    const { dark, setDark } = useDropContext()
    const history = useHistory()

    const redirectHome = () => {
        history.push('/')
    }


    return (
        <div className={dark ? 'FourOhFour_contentWrap' : 'LIGHTFourOhFour_contentWrap'}>
            <h1 className={dark ? 'FourOhFour_h1' : 'LIGHTFourOhFour_h1'}>404</h1>
            <div className={dark ? 'FourOhFour_text' : 'LIGHTFourOhFour_text'}>The page you are looking for either does not exist, or someone is playing a very good trick on you.</div>
            <div className={dark ? 'FourOhFour_text' : 'LIGHTFourOhFour_text'}>Would you like to go <span onClick={redirectHome} className={dark ? 'FourOhFour_home' : 'LIGHTFourOhFour_home'}>Home?</span></div>
        </div>
    )
}

export default FourOhFour;
