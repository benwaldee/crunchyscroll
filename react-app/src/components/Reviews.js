import "./CSS/Reviews.css"
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from "react";
import StarsSmall from './StarsSmall'
import Votes from './Votes';
import edit from './images/edit.png';
import deleteIco from './images/delete.png';
import starEmpty from './images/stars/star-empty.png'
import starFull from './images/stars/star-full.png'
import { getAllStoriesThunk } from '../store/stories'
import { getStoryReviewsThunk } from '../store/reviews.js'
import { getUserListsThunk } from '../store/lists.js'
import { useDispatch, useSelector } from 'react-redux';

const Reviews = ({ reviews, avgRating, user, userReview }) => {
    const history = useHistory()
    const dispatch = useDispatch()


    const [showEdit, setShowEdit] = useState(false)
    const [reviewEdit, setReviewEdit] = useState('')
    const [starsEdit, setStarsEdit] = useState('')
    const [editErrors, setEditErrors] = useState(false)

    const handleEditSubmit = (e) => {
        e.preventDefault()

        if (reviewEdit.length < 1) {
            setEditErrors('Please enter a review.')
            return
        }


        console.log('STUFF TO EDIT', starsEdit, reviewEdit)
        setStarsEdit('')
        setEditErrors(false)
        setReviewEdit('')
        setShowEdit(false)
    }


    return (
        <div className='Reviews_contentWrap'>
            {user && <div className='Reviews_myReviewWrap'>
                {!showEdit && userReview.length > 0 &&
                    <div className='Reviews_eachReviewWrap '>
                        <div className='Reviews_headerWrap'>
                            <div className='Reviews_username' > {userReview[0].user.username}</div>
                            <div className='Reviews_numReviews' > ({userReview[0].user.numReviews} reviews)</div>
                            <div className='Reviews_date' > {userReview[0].updated_at.slice(4, 16)}</div>
                        </div>
                        <div className='Reviews_smallStarsWrap'>
                            <StarsSmall reviews={reviews} avgRating={userReview[0].stars} />
                        </div>
                        <div className='Reviews_review' > {userReview[0].review}</div>
                        <div className='Reviews_bottomWrap'>
                            <Votes votes={userReview[0].votes} user={user} />
                            <div className='Reviews_editDeleteWrap'>
                                <img onClick={() => {
                                    setReviewEdit(userReview[0]?.review)
                                    setStarsEdit(userReview[0]?.stars)
                                    setShowEdit(true)
                                    return
                                }} className='Reviews_edit' src={edit}></img>
                                <img className='Reviews_delete' src={deleteIco}></img>
                            </div>
                        </div>
                    </div>
                }
                {showEdit && userReview.length > 0 &&
                    <div className='Reviews_eachReviewWrap'>
                        <form className="Reviews_editReviewForm" onSubmit={handleEditSubmit}>
                            <div className="Reviews_editHeader">Edit review as <span className="Reviews_editUsername">{user.username}</span></div>
                            <div className="Reviews_editStars">
                                {starsEdit < 1 && <img src={starEmpty} id='noStar1' onClick={() => setStarsEdit(1)} ></img>}
                                {starsEdit > 0 && <img src={starFull} id='star1' onClick={() => setStarsEdit(1)} ></img>}
                                {starsEdit < 2 && <img src={starEmpty} id='noStar2' onClick={() => setStarsEdit(2)} ></img>}
                                {starsEdit > 1 && <img src={starFull} id='star2' onClick={() => setStarsEdit(1)} ></img>}
                                {starsEdit < 3 && <img src={starEmpty} id='noStar3' onClick={() => setStarsEdit(3)} ></img>}
                                {starsEdit > 2 && <img src={starFull} id='star3' onClick={() => setStarsEdit(2)} ></img>}
                                {starsEdit < 4 && <img src={starEmpty} id='noStar4' onClick={() => setStarsEdit(4)} ></img>}
                                {starsEdit > 3 && <img src={starFull} id='star4' onClick={() => setStarsEdit(3)} ></img>}
                                {starsEdit < 5 && <img src={starEmpty} id='noStar5' onClick={() => setStarsEdit(5)} ></img>}
                                {starsEdit > 4 && <img src={starFull} id='star5' onClick={() => setStarsEdit(4)} ></img>}
                            </div>
                            {editErrors && <div className="Reviews_editErrors">{editErrors}</div>}
                            <textarea
                                value={reviewEdit}
                                onChange={(e) => setReviewEdit(e.target.value)}
                                maxLength={800}

                                className="Reviews_editReviewInput"></textarea>
                            <div className="Reviews_editReviewChar">{reviewEdit.length}/800</div>

                            <div className="Reviews_editSaveCancelWrap">
                                <button className="Reviews_editSave">Save</button>
                                <div className="Reviews_editCancel" onClick={() => setShowEdit(false)}>Cancel</div>
                            </div>
                        </form>
                    </div>
                }
            </div>}
            <div className='Reviews_allReviewsWrap'>
                {Object.values(reviews)
                    .filter((review) => review.user_id !== user?.id)
                    //sort by number of positive votes
                    .sort((a, b) => Number(b.votes.filter((vote) => vote.vote).length) - Number(a.votes.filter((vote) => vote.vote).length))
                    .map((review) => (
                        <div className='Reviews_eachReviewWrap'>
                            <div className='Reviews_headerWrap'>
                                <div className='Reviews_username' > {review.user.username}</div>
                                <div className='Reviews_numReviews' > ({review.user.numReviews} reviews)</div>
                                <div className='Reviews_date' > {review.updated_at.slice(4, 16)}</div>
                            </div>
                            <div className='Reviews_smallStarsWrap'>
                                <StarsSmall reviews={reviews} avgRating={review.stars} />
                            </div>
                            <div className='Reviews_review' > {review.review}</div>
                            <Votes votes={review.votes} user={user} />
                        </div>

                    ))}
            </div>
        </div >
    )
}

export default Reviews;
