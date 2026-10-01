from typing import Optional, List
from sqlmodel import Field, Relationship, SQLModel

class HeroMissionLink(SQLModel, table=True):
    hero_id: Optional[int] = Field(default=None, foreign_key="hero.id", primary_key=True)
    mission_id: Optional[int] = Field(default=None, foreign_key="mission.id", primary_key=True)

class MissionBase(SQLModel):
    title: str = Field(index=True)

class Mission(MissionBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    heroes: List["Hero"] = Relationship(back_populates="missions", link_model=HeroMissionLink)

class MissionCreate(MissionBase):
    pass

class MissionPublic(MissionBase):
    id: int

class TeamBase(SQLModel):
    name: str = Field(index=True, unique=True)
    headquarters: str

class Team(TeamBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    heroes: List["Hero"] = Relationship(back_populates="team")

class TeamCreate(TeamBase):
    pass

class TeamPublic(TeamBase):
    id: int

class HeroBase(SQLModel):
    name: str = Field(index=True)
    age: Optional[int] = Field(default=None, index=True)
    team_id: Optional[int] = Field(default=None, foreign_key="team.id")
    power: Optional[str] = None

class Hero(HeroBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    secret_name: str
    team: Optional[Team] = Relationship(back_populates="heroes")
    missions: List[Mission] = Relationship(back_populates="heroes", link_model=HeroMissionLink)

class HeroCreate(HeroBase):
    secret_name: str

class HeroPublic(HeroBase):
    id: int

class HeroUpdate(SQLModel):
    name: Optional[str] = None
    age: Optional[int] = None
    team_id: Optional[int] = None
    secret_name: Optional[str] = None
    power: Optional[str] = None