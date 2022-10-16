import "./CSS/Votes.css"
import "./CSS/Light/LIGHTVotes.css"
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from "react";
import { voteThunk } from '../store/reviews'
import { getStoryReviewsThunk } from '../store/reviews.js'
import { useDispatch, useSelector } from 'react-redux';
import { useDropContext } from '../context/Dropdown';

const Votes = ({ votes, user, reviewID, id, toggleRefresh, refresh }) => {
    const { dark } = useDropContext()
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
            history.push('/login-signup')
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
        <div className={dark ? 'Votes_contentWrap' : 'LIGHTVotes_contentWrap'} >

            <div className={dark ? 'Votes_text' : 'LIGHTVotes_text'} >{totalYes} out of {votes.length} people found this helpful. Was this review helpful to you?  </div>
            {!userVoted &&
                <>
                    <div onClick={() => handleVote(true, id)} className={dark ? 'Votes_Yes' : 'LIGHTVotes_Yes'} >YES</div>
                    <div className={dark ? 'Votes_line' : 'LIGHTVotes_line'} >|</div>
                    <div onClick={() => handleVote(false, id)} className={dark ? 'Votes_No' : 'LIGHTVotes_No'} >NO</div>
                </>
            }
            {userVoted &&
                <>
                    <div className={dark ? (`Votes_YesLock${userVoted}`) : (`LIGHTVotes_YesLock${userVoted}`)}>YES</div>
                    <div className={dark ? 'Votes_line' : 'LIGHTVotes_line'} >|</div>
                    <div className={dark ? (`Votes_NoLock${userVoted}`) : (`LIGHTVotes_NoLock${userVoted}`)}>NO</div>
                </>
            }
        </div >
    )
}

export default Votes;
