import "./CSS/StarsSmall.css"
import React, { useEffect } from 'react';
import starEmpty from './images/stars/star-empty.png'
import starQuart from './images/stars/star-quart.png'
import starHalf from './images/stars/star-half.png'
import starThQuart from './images/stars/star-three-quart.png'
import starFull from './images/stars/star-full.png'



const StarsSmall = ({ avgRating, reviews }) => {
    //no need to toggle light or dark, same either way

    if (Object.values(reviews).length === 0) { return <div className="StarsSmall_noRatings"> No ratings yet</div> }
    return (
        <>
            {avgRating < 1 && avgRating < 0.25 && <img className="StarsSmall_empty1 StarsSmall_star" src={starEmpty}></img>}
            {avgRating < 1 && avgRating < 0.5 && avgRating >= 0.25 && <img className="StarsSmall_quarter1 StarsSmall_star" src={starQuart}></img>}
            {avgRating < 1 && avgRating < 0.75 && avgRating >= 0.5 && <img className="StarsSmall_half1 StarsSmall_star" src={starHalf}></img>}
            {avgRating < 1 && avgRating < 1 && avgRating >= 0.75 && <img className="StarsSmall_3quarter1 StarsSmall_star" src={starThQuart}></img>}
            {avgRating >= 1 && <img className="StarsSmall_full1 StarsSmall_star" src={starFull}></img>}

            {avgRating < 2 && avgRating < 1.25 && <img className="StarsSmall_empty2 StarsSmall_star" src={starEmpty}></img>}
            {avgRating < 2 && avgRating < 1.5 && avgRating >= 1.25 && <img className="StarsSmall_quarter2 StarsSmall_star" src={starQuart}></img>}
            {avgRating < 2 && avgRating < 1.75 && avgRating >= 1.5 && <img className="StarsSmall_half2 StarsSmall_star" src={starHalf}></img>}
            {avgRating < 2 && avgRating < 2 && avgRating >= 1.75 && <img className="StarsSmall_3quarter2 StarsSmall_star" src={starThQuart}></img>}
            {avgRating >= 2 && <img className="StarsSmall_full2 StarsSmall_star" src={starFull}></img>}

            {avgRating < 3 && avgRating < 2.25 && <img className="StarsSmall_empty3 StarsSmall_star" src={starEmpty}></img>}
            {avgRating < 3 && avgRating < 2.5 && avgRating >= 2.25 && <img className="StarsSmall_quarter3 StarsSmall_star" src={starQuart}></img>}
            {avgRating < 3 && avgRating < 2.75 && avgRating >= 2.5 && <img className="StarsSmall_half3 StarsSmall_star" src={starHalf}></img>}
            {avgRating < 3 && avgRating < 3 && avgRating >= 2.75 && <img className="StarsSmall_3quarter3 StarsSmall_star" src={starThQuart}></img>}
            {avgRating >= 3 && <img className="StarsSmall_full3 StarsSmall_star" src={starFull}></img>}

            {avgRating < 4 && avgRating < 3.25 && <img className="StarsSmall_empty4 StarsSmall_star" src={starEmpty}></img>}
            {avgRating < 4 && avgRating < 3.5 && avgRating >= 3.25 && <img className="StarsSmall_quarter4 StarsSmall_star" src={starQuart}></img>}
            {avgRating < 4 && avgRating < 3.75 && avgRating >= 3.5 && <img className="StarsSmall_half4 StarsSmall_star" src={starHalf}></img>}
            {avgRating < 4 && avgRating < 4 && avgRating >= 3.75 && <img className="StarsSmall_3quarter4 StarsSmall_star" src={starThQuart}></img>}
            {avgRating >= 4 && <img className="StarsSmall_full4 StarsSmall_star" src={starFull}></img>}

            {avgRating < 5 && avgRating < 4.25 && <img className="StarsSmall_empty1 StarsSmall_star" src={starEmpty}></img>}
            {avgRating < 5 && avgRating < 4.5 && avgRating >= 4.25 && <img className="StarsSmall_quarter1 StarsSmall_star" src={starQuart}></img>}
            {avgRating < 5 && avgRating < 4.75 && avgRating >= 4.5 && <img className="StarsSmall_half1 StarsSmall_star" src={starHalf}></img>}
            {avgRating < 5 && avgRating < 4 && avgRating >= 4.75 && <img className="StarsSmall_3quarter1 StarsSmall_star" src={starThQuart}></img>}
            {avgRating >= 5 && <img className="StarsSmall_full1 StarsSmall_star" src={starFull}></img>}


        </>
    )
}

export default StarsSmall;
