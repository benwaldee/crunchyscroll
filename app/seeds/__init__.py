from flask.cli import AppGroup
from .users import seed_users, undo_users
from .lists_stories import seed_lists_stories, undo_lists_stories
from .reviews import seed_reviews,undo_reviews
from .votes import seed_votes,undo_votes

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_lists_stories()
    seed_reviews()
    seed_votes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_lists_stories()
    undo_reviews()
    undo_votes()
    # Add other undo functions here
