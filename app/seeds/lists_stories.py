from app.models.story import db, Story
from app.models.list import db,List
from .stories_data import story_list

def seed_lists_stories():

    # make list of story instances
    story_iter = []
    make1 = [story_iter.append(Story(
        user_id=1,
        title=story["title"],
        body=story["body"],
        image_url=story["image_url"]
    )) for story in story_list]

# make watchlists for first three users
    watchlist1 = List(
        user_id=1,
        watchlist=True,
        name="Watchlist"
    )
    watchlist2 = List(
        user_id=2,
        watchlist=True,
        name="Watchlist"
    )
    watchlist3 = List(
        user_id=3,
        watchlist=True,
        name="Watchlist"
    )
    # make custom lists for user one
    custom1 = List(
        user_id=1,
        watchlist=False,
        name="coolest"
    )
    custom2 = List(
        user_id=1,
        watchlist=False,
        name="normalones"
    )

    #putting some stories into lists
    list_list = [watchlist1,watchlist2,watchlist3,custom1,custom2]
    custom_list = [custom1,custom2]

    for x in list_list:
        x.stories.append(story_iter[0])
        x.stories.append(story_iter[4])

    for y in custom_list:
        y.stories.append(story_iter[10])
        y.stories.append(story_iter[15])
        y.stories.append(story_iter[7])

    # add stories
    make2 = [db.session.add(story_instance) for story_instance in story_iter]

    # add lists
    make3 = [db.session.add(list_instance) for list_instance in list_list]

    # commit
    db.session.commit()


def undo_lists_stories():
    db.session.execute('TRUNCATE stories RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE lists RESTART IDENTITY CASCADE;')
    db.session.commit()
