from sqlmodel import SQLModel, Session, select
from app.database import engine
from app.models import Hero, Mission, Team

def seed():
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        if session.exec(select(Team)).first():
            print("already seeded")
            return

        avengers = Team(name="Avengers", headquarters="New York")
        xmen = Team(name="X-Men", headquarters="Westchester")

        sokovia = Mission(title="Battle of Sokovia")
        civil_war = Mission(title="Civil War")

        hero1 = Hero(name="Iron Man", secret_name="Tony Stark", age=48, team=avengers, missions=[sokovia, civil_war])
        hero2 = Hero(name="Captain America", secret_name="Steve Rogers", age=100, team=avengers, missions=[sokovia, civil_war])
        hero3 = Hero(name="Black Widow", secret_name="Natasha Romanoff", age=35, team=avengers, missions=[sokovia])
        hero4 = Hero(name="Wolverine", secret_name="Logan", age=150, team=xmen)
        hero5 = Hero(name="Professor X", secret_name="Charles Xavier", age=60, team=xmen)

        session.add_all([avengers, xmen, sokovia, civil_war, hero1, hero2, hero3, hero4, hero5])
        session.commit()
        print("seeded successfully")

if __name__ == "__main__":
    seed()
