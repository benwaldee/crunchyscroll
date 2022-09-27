from .db import db

lists_stories = db.Table(
    "lists_stories",
    db.Column(
        "story_id",
        db.Integer,
        db.ForeignKey("stories.id"),
        primary_key=True
    ),
    db.Column(
        "list_id",
        db.Integer,
        db.ForeignKey("lists.id"),
        primary_key=True
    )
)
