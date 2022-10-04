import "./CSS/FourOhFour.css"
import { useHistory } from 'react-router-dom';

const FourOhFour = () => {
    const history = useHistory()

    const redirectHome = () => {
        history.push('/')
    }


    return (
        <div className='FourOhFour_contentWrap'>
            <h1 className='FourOhFour_h1'>404</h1>
            <div className='FourOhFour_text'>The page you are looking for either does not exist, or someone is playing a very good trick on you.</div>
            <div className='FourOhFour_text'>Would you like to go <span onClick={redirectHome} className='FourOhFour_home'>Home?</span></div>
        </div>
    )
}

export default FourOhFour;
