import "./CSS/Votes.css"
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from "react";


const Votes = ({ votes, user }) => {
    const history = useHistory()
    let totalYes = votes.filter((vote) => vote.vote).length

    useEffect(() => {
        for (let vote of votes) {


            if (Number(vote.user_id) === Number(user?.id) && user) {
                setUserVoted(`${vote.vote}`)
                return
            }
        }
        setUserVoted(false)

    }, [user])


    const [userVoted, setUserVoted] = useState(true)

    return (
        <div className='Votes_contentWrap'>

            <div className='Votes_text' >{totalYes} out of {votes.length} people found this helpful. Was this review helpful to you?  </div>
            {!userVoted &&
                <>
                    <div className='Votes_Yes'>YES</div>
                    <div className='Votes_line'>|</div>
                    <div className='Votes_No'>NO</div>
                </>
            }
            {userVoted &&
                <>
                    <div className={`Votes_YesLock${userVoted}`}>YES</div>
                    <div className='Votes_line'>|</div>
                    <div className={`Votes_NoLock${userVoted}`}>NO</div>
                </>
            }
        </div >
    )
}

export default Votes;
