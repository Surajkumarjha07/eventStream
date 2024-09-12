from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy import create_engine,Column, Integer, String, ForeignKey, LargeBinary

engine = create_engine("postgresql://postgres:postgrescompass@localhost:7000/eventStream")
sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class dbUser(Base):
     __tablename__ = "users"

     id = Column(Integer, index= True, primary_key= True)
     name = Column(String)
     email = Column(String, unique= True)
     password = Column(String)

     eventBook = relationship("eventBooked", back_populates="user", cascade="all,delete-orphan")

class eventBooked(Base):
    __tablename__ = 'booked_events'

    id = Column(Integer,index= True, primary_key= True)
    name = Column(String)
    email = Column(String, ForeignKey("users.email", ondelete='CASCADE')) 
    event_booked = Column(String)

    user = relationship("dbUser", back_populates="eventBook")

class event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    event_creator = Column(String)
    title = Column(String)
    category = Column(String)
    date = Column(String)
    start_time = Column(String)
    end_time = Column(String)
    type = Column(String)
    location = Column(String)
    building = Column(String) 
    region = Column(String) 
    venue = Column(String)
    price = Column(Integer)
    capacity = Column(Integer)
    event_img = Column(String)

def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()

Base.metadata.create_all(bind=engine)