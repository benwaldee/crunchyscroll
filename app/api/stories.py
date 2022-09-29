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
