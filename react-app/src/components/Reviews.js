import "./CSS/Reviews.css"
import "./CSS/Light/LIGHTReviews.css"
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from "react";
import StarsSmall from './StarsSmall'
import Votes from './Votes';
import edit from './images/edit.png';
import deleteIco from './images/delete.png';
import starEmpty from './images/stars/star-empty.png'
import starFull from './images/stars/star-full.png'
import { useDispatch, useSelector } from 'react-redux';
import { editReviewThunk } from '../store/reviews.js'
import { addReviewThunk } from '../store/reviews.js'
import DeleteReviewModal from './DeleteReviewModal'
import { getStoryReviewsThunk } from '../store/reviews.js'
import { useDropContext } from '../context/Dropdown';

const Reviews = ({ reviews, avgRating, user, userReview, id, toggleRefresh, refresh }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { dark } = useDropContext()


    const [showEdit, setShowEdit] = useState(false)
    const [reviewEdit, setReviewEdit] = useState('')
    const [starsEdit, setStarsEdit] = useState('')
    const [editErrors, setEditErrors] = useState(false)

    const [showAdd, setShowAdd] = useState(false)
    const [reviewAdd, setReviewAdd] = useState('')
    const [starsAdd, setStarsAdd] = useState(0)
    const [addErrors, setAddErrors] = useState(false)

    const handleEditSubmit = (e) => {
        e.preventDefault()

        if (reviewEdit.length < 1) {
            setEditErrors('Please enter a review.')
            return
        }

        let updateObj = {
            stars: starsEdit,
            review: reviewEdit
        }

        let revID = userReview[0].id

        dispatch(editReviewThunk(updateObj, revID))

        setStarsAdd('')
        setEditErrors(false)
        setReviewEdit('')
        setShowEdit(false)
    }

    const handleAddSubmit = (e) => {
        e.preventDefault()

        let newErrors = {}

        if (reviewAdd.length < 1) {
            newErrors.review = ('Please enter a review.')
        }
        if (starsAdd < 1) {
            newErrors.stars = ('Please provide a star rating.')
        }

        if (Object.values(newErrors).length > 0) {
            setAddErrors(newErrors)
            return
        }


        let addObj = {
            stars: starsAdd,
            review: reviewAdd,
            user_id: user.id,
            story_id: Number(id)
        }
        dispatch(addReviewThunk(addObj))
            .then(() => dispatch(getStoryReviewsThunk(id)))

        toggleRefresh(!refresh)
        setStarsAdd(0)
        setAddErrors(false)
        setReviewAdd('')
        setShowAdd(false)
    }


    useEffect(() => {

    }, [showAdd, showEdit])

    return (
        <div className={dark ? 'Reviews_contentWrap' : 'LIGHTReviews_contentWrap'}>
            {user && <div className={dark ? 'Reviews_myReviewWrap' : 'LIGHTReviews_myReviewWrap'}>
                {!showEdit && userReview.length > 0 &&
                    <div className={dark ? 'Reviews_eachReviewWrap' : 'LIGHTReviews_eachReviewWrap'}>
                        <div className={dark ? 'Reviews_headerWrap' : 'LIGHTReviews_headerWrap'}>
                            <div className={dark ? 'Reviews_username' : 'LIGHTReviews_username'} > {userReview[0].user.username}</div>
                            <div className={dark ? 'Reviews_numReviews' : 'LIGHTReviews_numReviews'} > ({userReview[0].user.numReviews} reviews)</div>
                            <div className={dark ? 'Reviews_date' : 'LIGHTReviews_date'} > {userReview[0].updated_at.slice(4, 16)}</div>
                        </div>
                        <div className={dark ? 'Reviews_smallStarsWrap' : 'LIGHTReviews_smallStarsWrap'}>
                            <StarsSmall reviews={reviews} avgRating={userReview[0].stars} />
                        </div>
                        <div className={dark ? 'Reviews_review' : 'LIGHTReviews_review'} > {userReview[0].review}</div>
                        <div className={dark ? 'Reviews_bottomWrap' : 'LIGHTReviews_bottomWrap'}>
                            <Votes votes={userReview[0].votes} user={user} id={id} reviewID={userReview[0].id} toggleRefresh={toggleRefresh} refresh={refresh} />
                            <div className={dark ? 'Reviews_editDeleteWrap' : 'LIGHTReviews_editDeleteWrap'}>
                                <img onClick={() => {
                                    setReviewEdit(userReview[0]?.review)
                                    setStarsEdit(userReview[0]?.stars)
                                    setShowEdit(true)
                                    return
                                }} className={dark ? 'Reviews_edit' : 'LIGHTReviews_edit'} src={edit}></img>
                                <DeleteReviewModal reviewID={Number(userReview[0].id)} />
                            </div>
                        </div>
                    </div>
                }
                {showEdit && userReview.length > 0 &&
                    <div className={dark ? 'Reviews_eachReviewWrap' : 'LIGHTReviews_eachReviewWrap'}>
                        <form className={dark ? "Reviews_editReviewForm" : "LIGHTReviews_editReviewForm"} onSubmit={handleEditSubmit}>
                            <div className={dark ? "Reviews_editHeader" : "LIGHTReviews_editHeader"}>Edit review as <span className={dark ? "Reviews_editUsername" : "LIGHTReviews_editUsername"}>{user.username}</span></div>
                            <div className={dark ? "Reviews_editStars" : "LIGHTReviews_editStars"}>
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
                            {editErrors && <div className={dark ? "Reviews_editErrors" : "LIGHTReviews_editErrors"}>{editErrors}</div>}
                            <textarea
                                value={reviewEdit}
                                onChange={(e) => setReviewEdit(e.target.value)}
                                maxLength={800}

                                className={dark ? "Reviews_editReviewInput" : "LIGHTReviews_editReviewInput"}></textarea>
                            <div className={dark ? "Reviews_editReviewChar" : "LIGHTReviews_editReviewChar"}>{reviewEdit.length}/800</div>

                            <div className={dark ? "Reviews_editSaveCancelWrap" : "LIGHTReviews_editSaveCancelWrap"}>
                                <button className={dark ? "Reviews_editSave" : "LIGHTReviews_editSave"}>Save</button>
                                <div className={dark ? "Reviews_editCancel" : "LIGHTReviews_editCancel"} onClick={() => {
                                    setEditErrors(false)
                                    setShowEdit(false)
                                }}>Cancel</div>
                            </div>
                        </form>
                    </div>
                }
                {!showAdd && userReview.length < 1 &&
                    <div className={dark ? "Reviews_addWrap" : "LIGHTReviews_addWrap"}>
                        <div className={dark ? "Reviews_addHeader" : "LIGHTReviews_addHeader"}> Review as <span className={dark ? "Reviews_addUsername" : "LIGHTReviews_addUsername"}>{user.username}</span></div>
                        <div
                            onClick={() => setShowAdd(true)}
                            className={dark ? "Reviews_showAddButton" : "LIGHTReviews_showAddButton"}> ADD A REVIEW</div>
                    </div>
                }
                {showAdd && userReview.length < 1 &&
                    <div className={dark ? 'Reviews_eachReviewWrap' : 'LIGHTReviews_eachReviewWrap'}>
                        <form className={dark ? "Reviews_editReviewForm" : "LIGHTReviews_editReviewForm"} onSubmit={handleAddSubmit}>
                            <div className={dark ? "Reviews_editHeader" : "LIGHTReviews_editHeader"}>Create review as <span className={dark ? "Reviews_editUsername" : "LIGHTReviews_editUsername"}>{user.username}</span></div>
                            {addErrors.stars && <div className={dark ? "Reviews_editErrors" : "LIGHTReviews_editErrors"}>{addErrors.stars}</div>}
                            <div className={dark ? "Reviews_editStars" : "LIGHTReviews_editStars"}>
                                {starsAdd < 1 && <img src={starEmpty} id='noStar1' onClick={() => setStarsAdd(1)} ></img>}
                                {starsAdd > 0 && <img src={starFull} id='star1' onClick={() => setStarsAdd(1)} ></img>}
                                {starsAdd < 2 && <img src={starEmpty} id='noStar2' onClick={() => setStarsAdd(2)} ></img>}
                                {starsAdd > 1 && <img src={starFull} id='star2' onClick={() => setStarsAdd(1)} ></img>}
                                {starsAdd < 3 && <img src={starEmpty} id='noStar3' onClick={() => setStarsAdd(3)} ></img>}
                                {starsAdd > 2 && <img src={starFull} id='star3' onClick={() => setStarsAdd(2)} ></img>}
                                {starsAdd < 4 && <img src={starEmpty} id='noStar4' onClick={() => setStarsAdd(4)} ></img>}
                                {starsAdd > 3 && <img src={starFull} id='star4' onClick={() => setStarsAdd(3)} ></img>}
                                {starsAdd < 5 && <img src={starEmpty} id='noStar5' onClick={() => setStarsAdd(5)} ></img>}
                                {starsAdd > 4 && <img src={starFull} id='star5' onClick={() => setStarsAdd(4)} ></img>}
                            </div>
                            {addErrors.review && <div className={dark ? "Reviews_editErrors" : "LIGHTReviews_editErrors"}>{addErrors.review}</div>}
                            <textarea
                                value={reviewAdd}
                                onChange={(e) => setReviewAdd(e.target.value)}
                                maxLength={800}

                                className={dark ? "Reviews_editReviewInput" : "LIGHTReviews_editReviewInput"}></textarea>
                            <div className={dark ? "Reviews_editReviewChar" : "LIGHTReviews_editReviewChar"}>{reviewAdd.length}/800</div>

                            <div className={dark ? "Reviews_editSaveCancelWrap" : "LIGHTReviews_editSaveCancelWrap"}>
                                <button className={dark ? "Reviews_editSave" : "LIGHTReviews_editSave"}>Add</button>
                                <div className={dark ? "Reviews_editCancel" : "LIGHTReviews_editCancel"} onClick={() => {
                                    setAddErrors(false)
                                    setReviewAdd('')
                                    setStarsAdd(0)
                                    setShowAdd(false)
                                }}>Cancel</div>
                            </div>
                        </form>
                    </div>
                }
            </div>}
            <div className={dark ? 'Reviews_allReviewsWrap' : 'LIGHTReviews_allReviewsWrap'}>
                {Object.values(reviews)
                    .filter((review) => review.user_id !== user?.id)
                    //sort by number of positive votes
                    .sort((a, b) => Number((b.votes.filter((vote) => vote.vote).length) / (b.votes.length)) - Number((a.votes.filter((vote) => vote.vote).length)) / (a.votes.length))
                    .map((review) => (
                        <div className={dark ? 'Reviews_eachReviewWrap' : 'LIGHTReviews_eachReviewWrap'}>
                            <div className={dark ? 'Reviews_headerWrap' : 'LIGHTReviews_headerWrap'}>
                                <div className={dark ? 'Reviews_username' : 'LIGHTReviews_username'} > {review.user.username}</div>
                                <div className={dark ? 'Reviews_numReviews' : 'LIGHTReviews_numReviews'} > ({review.user.numReviews} reviews)</div>
                                <div className={dark ? 'Reviews_date' : 'LIGHTReviews_date'} > {review.updated_at.slice(4, 16)}</div>
                            </div>
                            <div className={dark ? 'Reviews_smallStarsWrap' : 'LIGHTReviews_smallStarsWrap'}>
                                <StarsSmall reviews={reviews} avgRating={review.stars} />
                            </div>
                            <div className={dark ? 'Reviews_review' : 'LIGHTReviews_review'} > {review.review}</div>
                            <Votes id={id} votes={review.votes} user={user} reviewID={review.id} toggleRefresh={toggleRefresh} refresh={refresh} />
                        </div>

                    ))}
            </div>
        </div >
    )
}

export default Reviews;
