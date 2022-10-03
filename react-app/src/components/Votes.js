import "./CSS/Votes.css"
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from "react";
import { voteThunk } from '../store/reviews'
import { getStoryReviewsThunk } from '../store/reviews.js'
import { useDispatch, useSelector } from 'react-redux';

const Votes = ({ votes, user, reviewID, id, toggleRefresh, refresh }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    let totalYes = votes.filter((vote) => vote.vote).length

    useEffect(() => {
        for (let vote of votes) {


            if (Number(vote.user_id) === Number(user?.id) && user) {
                setUserVoted(`${vote.vote}`)
                return
            }
        }
        setUserVoted(false)

    }, [user, refresh])

    const handleVote = (bool, id) => {

        if (!user) {
            history.push('login-signup')
            return
        }

        let voteObj = {
            user_id: user.id,
            review_id: reviewID,
            vote: bool
        }


        dispatch(voteThunk(voteObj))
            .then(() => dispatch(getStoryReviewsThunk(Number(id))))
            .then(() => toggleRefresh(!refresh))
    }


    const [userVoted, setUserVoted] = useState(true)

    return (
        <div className='Votes_contentWrap'>

            <div className='Votes_text' >{totalYes} out of {votes.length} people found this helpful. Was this review helpful to you?  </div>
            {!userVoted &&
                <>
                    <div onClick={() => handleVote(true, id)} className='Votes_Yes'>YES</div>
                    <div className='Votes_line'>|</div>
                    <div onClick={() => handleVote(false, id)} className='Votes_No'>NO</div>
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
