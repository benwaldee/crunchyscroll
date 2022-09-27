from app.models.vote import db, Vote

def seed_votes():
  for i in range(40):
    db.session.add(Vote(
      user_id=1,
      review_id=i+1,
      vote=True
    ))
    db.session.add(Vote(
      user_id=2,
      review_id=i+1,
      vote=False
    ))

  db.session.commit()

def undo_votes():
  db.session.execute('TRUNCATE votes RESTART IDENTITY CASCADE;')
  db.session.commit()
