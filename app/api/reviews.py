from flask import Blueprint, jsonify,request
from flask_login import login_required
from app.models import User,db
from app.models import Story, List, Review
from flask_login import current_user, login_user, logout_user, login_required
import json
from datetime import datetime

reviews = Blueprint('reviews', __name__)

@reviews.route('/',methods=['POST'])
def add_review():

    data = request.json
    stars = data["stars"]
    review = data["review"]
    user_id = data["user_id"]
    story_id = data["story_id"]

    new_review = Review(
        stars=int(stars),
        review=review,
        user_id=int(user_id),
        story_id=int(story_id)
    )

    db.session.add(new_review)
    db.session.commit()

    all_reviews = Review.query.all()
    added_review = all_reviews[-1]

     # review instance -> objects
    added_review = added_review.to_dict()

    #normalize votes
    newVotes= []
    for vote in added_review["votes"] :
        newVotes.append(vote.to_dict())
    added_review["votes"] = newVotes


    return added_review


@reviews.route('/<id>',methods=['PUT'])
def edit_review(id):

    data = request.json
    stars = data["stars"]
    review = data["review"]

    edit_review = Review.query.get(int(id))

    edit_review.stars=stars
    edit_review.review=review
    edit_review.updated_at=datetime.now()

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

@reviews.route('/<id>',methods=['DELETE'])
def delete_review(id):
    delete_me_review = Review.query.get(int(id))
    db.session.delete(delete_me_review)
    db.session.commit()
    return id
