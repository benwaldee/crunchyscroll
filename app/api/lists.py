from flask import Blueprint, jsonify,request
from flask_login import login_required
from app.models import User,db
from app.models import Story, List
from flask_login import current_user, login_user, logout_user, login_required
import json

lists = Blueprint('lists', __name__)


@lists.route('/user')
def user_lists():

   try:
    id = current_user.id
   except:
    return {}
   else:
    _lists = List.query.all()
    user_lists = [listy for listy in _lists if listy.user_id == current_user.id]
    # print('HEREEEEEEEEEEEEEE',user_lists)
    norm_user_lists = [lis.to_dict() for lis in user_lists ]

    for lis in norm_user_lists:
        storyArr =[]
        for story in lis["stories"]:
            storyArr.append(story.id)
        lis["stories"] = storyArr
        lis["user_id"] = lis["user_id"].id

    # print('norMMMMM',norm_user_lists)
    # print (norm_user_lists)
    return {listy["id"]: listy for listy in norm_user_lists}
    # return {}

@lists.route('/addstory',methods=['PUT'])
def add_story_list():
    update_dict = request.json
    story_id = int(update_dict["story_id"])
    list_id = int(update_dict["list_id"])

    story = Story.query.get(story_id)
    lis = List.query.get(list_id)

    story.lists.append(lis)

    db.session.commit()

    return {}

@lists.route('/removestory',methods=['PUT'])
def remove_story_list():
    update_dict = request.json
    story_id = int(update_dict["story_id"])
    list_id = int(update_dict["list_id"])

    story = Story.query.get(story_id)
    lis = List.query.get(list_id)

    story.lists.remove(lis)

    db.session.commit()

    return {}
