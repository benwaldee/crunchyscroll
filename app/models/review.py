from .db import db
from datetime import datetime


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    story_id = db.Column(db.Integer, db.ForeignKey("stories.id",ondelete="CASCADE"), nullable=False)
    review = db.Column(db.String(1000), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user = db.relationship("User",back_populates="reviews")
    stories = db.relationship("Story",back_populates="reviews")
    votes = db.relationship("Vote",back_populates="review")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'story_id': self.story_id,
            'review': self.review,
            'stars': self.stars,
            'updated_at': self.updated_at,
            'created_at': self.created_at,
            'user': self.user.to_dict()
        }
