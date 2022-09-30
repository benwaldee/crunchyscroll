from flask import Blueprint, jsonify,request
from flask_login import login_required
from app.models import User,db
from app.models import Story, List
from flask_login import current_user, login_user, logout_user, login_required
import json

stories = Blueprint('stories', __name__)


@stories.route('/')
def all_stories():

    storyList = Story.query.all()

    # instances -> objects
    dictStories = [story.to_dict() for story in storyList]

    # normalize lists of inner instances
    for story in dictStories:
        reviewList=[]
        listsList=[]
        for review in story["reviews"]:
            reviewList.append(int(review.id))
        story["reviews"] = reviewList
        for list_ in story["lists"]:
            listsList.append(int(list_.id))
        story["lists"] = listsList

    #list of normalized instances to dict
    storyDict = {story["id"]: story for story in dictStories}

    return storyDict

@stories.route('/',methods=['POST'])
def create_story():
    data = request.json

    newStory = Story(
        user_id=data["user_id"],
        title=data["title"],
        body=data["body"],
        image_url=data["image_url"]
    )

    db.session.add(newStory)
    db.session.commit()

    all_stories = Story.query.all()
    added_story = all_stories[-1]
    added_story = added_story.to_dict()

    # normalize relational lists

    reviewList=[]
    listsList=[]
    for review in added_story["reviews"]:
        reviewList.append(int(review.id))
    added_story["reviews"] = reviewList
    for list_ in added_story["lists"]:
            listsList.append(int(list_.id))
    added_story["lists"] = listsList

    return added_story

@stories.route('/',methods=['PUT'])
def edit_story():
    data = request.json

    found_story = Story.query.get(int(data["id"]))

    found_story.title = data["title"]
    found_story.body = data["body"]
    found_story.image_url = data["image_url"]



    db.session.add(found_story)
    db.session.commit()

    edited_story = Story.query.filter(Story.id == int(data["id"])).first()
    print(edited_story)
    edited_story = edited_story.to_dict()


    # # normalize relational lists

    reviewList=[]
    listsList=[]
    for review in edited_story["reviews"]:
        reviewList.append(int(review.id))
    edited_story["reviews"] = reviewList
    for list_ in edited_story["lists"]:
            listsList.append(int(list_.id))
    edited_story["lists"] = listsList

    return edited_story

@stories.route('/<id>',methods=['DELETE'])
def delete_story(id):
    delete_me_story = Story.query.get(int(id))
    db.session.delete(delete_me_story)
    db.session.commit()
    return id

@stories.route('/<id>/reviews')
def story_reviews(id):

    review_me_story = Story.query.get(int(id))

    # review instances -> objects
    reviews = [review.to_dict() for review in review_me_story.reviews]

    #list of normalized instances to dict
    reviewDict = {review["id"]: review for review in reviews}

    return reviewDict
