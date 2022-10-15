import "./CSS/Stars.css"
import React, { useEffect } from 'react';
import starEmpty from './images/stars/star-empty.png'
import starQuart from './images/stars/star-quart.png'
import starHalf from './images/stars/star-half.png'
import starThQuart from './images/stars/star-three-quart.png'
import starFull from './images/stars/star-full.png'



const Stars = ({ avgRating, reviews }) => {
    //no need to toggle light or dark, same either way

    console.log(avgRating)
    console.log(reviews)
    if (Object.values(reviews).length === 0) { return <div className="Stars_noRatings"> No ratings yet</div> }
    return (
        <>
            {avgRating < 1 && avgRating < 0.25 && <img className="Stars_empty1 Stars_star" src={starEmpty}></img>}
            {avgRating < 1 && avgRating < 0.5 && avgRating >= 0.25 && <img className="Stars_quarter1 Stars_star" src={starQuart}></img>}
            {avgRating < 1 && avgRating < 0.75 && avgRating >= 0.5 && <img className="Stars_half1 Stars_star" src={starHalf}></img>}
            {avgRating < 1 && avgRating < 1 && avgRating >= 0.75 && <img className="Stars_3quarter1 Stars_star" src={starThQuart}></img>}
            {avgRating >= 1 && <img className="Stars_full1 Stars_star" src={starFull}></img>}

            {avgRating < 2 && avgRating < 1.25 && <img className="Stars_empty2 Stars_star" src={starEmpty}></img>}
            {avgRating < 2 && avgRating < 1.5 && avgRating >= 1.25 && <img className="Stars_quarter2 Stars_star" src={starQuart}></img>}
            {avgRating < 2 && avgRating < 1.75 && avgRating >= 1.5 && <img className="Stars_half2 Stars_star" src={starHalf}></img>}
            {avgRating < 2 && avgRating < 2 && avgRating >= 1.75 && <img className="Stars_3quarter2 Stars_star" src={starThQuart}></img>}
            {avgRating >= 2 && <img className="Stars_full2 Stars_star" src={starFull}></img>}

            {avgRating < 3 && avgRating < 2.25 && <img className="Stars_empty3 Stars_star" src={starEmpty}></img>}
            {avgRating < 3 && avgRating < 2.5 && avgRating >= 2.25 && <img className="Stars_quarter3 Stars_star" src={starQuart}></img>}
            {avgRating < 3 && avgRating < 2.75 && avgRating >= 2.5 && <img className="Stars_half3 Stars_star" src={starHalf}></img>}
            {avgRating < 3 && avgRating < 3 && avgRating >= 2.75 && <img className="Stars_3quarter3 Stars_star" src={starThQuart}></img>}
            {avgRating >= 3 && <img className="Stars_full3 Stars_star" src={starFull}></img>}

            {avgRating < 4 && avgRating < 3.25 && <img className="Stars_empty4 Stars_star" src={starEmpty}></img>}
            {avgRating < 4 && avgRating < 3.5 && avgRating >= 3.25 && <img className="Stars_quarter4 Stars_star" src={starQuart}></img>}
            {avgRating < 4 && avgRating < 3.75 && avgRating >= 3.5 && <img className="Stars_half4 Stars_star" src={starHalf}></img>}
            {avgRating < 4 && avgRating < 4 && avgRating >= 3.75 && <img className="Stars_3quarter4 Stars_star" src={starThQuart}></img>}
            {avgRating >= 4 && <img className="Stars_full4 Stars_star" src={starFull}></img>}

            {avgRating < 5 && avgRating < 4.25 && <img className="Stars_empty1 Stars_star" src={starEmpty}></img>}
            {avgRating < 5 && avgRating < 4.5 && avgRating >= 4.25 && <img className="Stars_quarter1 Stars_star" src={starQuart}></img>}
            {avgRating < 5 && avgRating < 4.75 && avgRating >= 4.5 && <img className="Stars_half1 Stars_star" src={starHalf}></img>}
            {avgRating < 5 && avgRating < 4 && avgRating >= 4.75 && <img className="Stars_3quarter1 Stars_star" src={starThQuart}></img>}
            {avgRating >= 5 && <img className="Stars_full1 Stars_star" src={starFull}></img>}


        </>
    )
}

export default Stars;
