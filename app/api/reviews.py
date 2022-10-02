from flask import Blueprint, jsonify,request
from flask_login import login_required
from app.models import User,db
from app.models import Story, List, Review
from flask_login import current_user, login_user, logout_user, login_required
import json

reviews = Blueprint('reviews', __name__)


@reviews.route('/<id>',methods=['PUT'])
def edit_review(id):

    data = request.json
    stars = data["stars"]
    review = data["review"]

    edit_review = Review.query.get(int(id))

    edit_review.stars=stars
    edit_review.review=review

    db.session.add(edit_review)
    db.session.commit()

    return_rev = Review.query.get(int(id))

     # review instance -> objects
    return_rev = return_rev.to_dict()

    #normalize votes
    newVotes= []
    for vote in return_rev["votes"] :
        newVotes.append(vote.to_dict())
    return_rev["votes"] = newVotes


    return return_rev
