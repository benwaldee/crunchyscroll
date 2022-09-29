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
