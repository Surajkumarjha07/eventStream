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
    date: Optional[str] | None
    start_time: Optional[str] | None
    end_time: Optional[str] | None
    type: str
    location: Optional[str] | None
    building: Optional[str] = None
    region: Optional[str] = None
    venue: Optional[str] = None
    price: Optional[int] = None
    capacity: int