from .db import db
from .lists_stories import lists_stories


class List(db.Model):
    __tablename__ = "lists"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    watchlist = db.Column(db.Boolean, nullable=False)
    name = db.Column(db.String(1000), nullable=False)

    user = db.relationship("User",back_populates="lists")

    stories = db.relationship(
        "Story",
        secondary=lists_stories,
        back_populates="lists"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user,
            'watchlist': self.watchlist,
            'name': self.name,
            'stories': self.stories
        }
