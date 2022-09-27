from app.models.review import db, Review

def seed_reviews():
  for i in range(20):
    db.session.add(Review(
        user_id=1,
        story_id=i+1,
        review="This story really spoke to me.",
        stars=4))
    db.session.add(Review(
        user_id=2,
        story_id=i+1,
        review="This story was cool but it was not necessarily that good. The author could have written a far better conclusion",
        stars=3))

  db.session.commit()

def undo_reviews():
  db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
  db.session.commit()
