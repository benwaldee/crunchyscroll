from .db import db


class Vote(db.Model):
    __tablename__ = "votes"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    review_id = db.Column(db.Integer, db.ForeignKey("reviews.id",ondelete="CASCADE"), nullable=False)
    vote = db.Column(db.Boolean, nullable=False)

    user = db.relationship("User",back_populates="votes")
    review = db.relationship("Review",back_populates="votes")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'review_id': self.review_id,
            'vote': self.vote,
        }
