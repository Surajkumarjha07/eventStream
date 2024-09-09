from pydantic import BaseModel
from typing import Optional

class CreateUser(BaseModel):
    name: str 
    email: str
    password: str

class EventModel(BaseModel):
    event_creator: str
    title: str
    category: str
    date: str
    start_time: str
    end_time: str
    type: str
    location: str
    building: Optional[str] = None
    region: Optional[str] = None
    venue: Optional[str] = None
    price: Optional[int] = None
    capacity: int