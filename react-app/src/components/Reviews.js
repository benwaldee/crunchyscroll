import "./CSS/Reviews.css"
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from "react";
import StarsSmall from './StarsSmall'
import Votes from './Votes'

const Reviews = ({ reviews, avgRating, user }) => {
    const history = useHistory()




    return (
        <div className='Reviews_contentWrap'>
            <div className='Reviews_myReviewWrap'></div>
            <div className='Reviews_allReviewsWrap'>
                {Object.values(reviews).map((review) => (
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
