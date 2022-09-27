from .db import db
from .lists_stories import lists_stories
from datetime import datetime


class Story(db.Model):
    __tablename__ = "stories"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user = db.relationship("User",back_populates="stories")
    reviews = db.relationship("Review",back_populates="stories",cascade="all, delete")

    lists = db.relationship(
        "List",
        secondary=lists_stories,
        back_populates="stories"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'body': self.body,
            'image_url': self.image_url,
            'reviews': self.reviews,
            'lists': self.lists
        }
