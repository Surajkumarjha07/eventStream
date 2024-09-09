from fastapi import FastAPI, APIRouter,HTTPException,status,Depends, File, UploadFile, Form
from models import EventModel
from sqlalchemy.orm import Session
from database import get_db,event
import os 
from fastapi.responses import JSONResponse

app = FastAPI()
router = APIRouter(
    prefix='/events',
    tags=['events']
)

@router.post('/createEvent')
async def create_event(
    # evt: EventModel = Depends(),
    evt: EventModel,
    # file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
        
        # userImages = 'uploads'
        # if not os.path.exists(userImages):
        #       os.mkdir(userImages)

        # ImageFile = await file.read()
        # print(ImageFile)
        # FileName = evt.title + file.filename
        # print(FileName)

        # ImagePath = os.path.join(userImages,FileName)
        # print(ImagePath)

        # with open(ImagePath, 'wb') as uploadFolder:
        #     uploadFolder.write(ImageFile)
            
        # print(f"File created and path written to: {ImagePath}")

        # CreatedEvent = event(event_creator=evt.event_creator, title=evt.title, category=evt.category, date=evt.date, start_time=evt.start_time, end_time=evt.end_time, type=evt.type, location=evt.location, building=evt.building, region=evt.region, venue=evt.venue, price=evt.price, capacity=evt.capacity, event_img=FileName) 

        CreatedEvent = event(event_creator=evt.event_creator, title=evt.title, category=evt.category, date=evt.date, start_time=evt.start_time, end_time=evt.end_time, type=evt.type, location=evt.location, building=evt.building, region=evt.region, venue=evt.venue, price=evt.price, capacity=evt.capacity) 

        db.add(CreatedEvent)
        db.commit()
        db.refresh(CreatedEvent)
        # return {'user': CreatedEvent, 'filename': file.filename}  
        return {'event': CreatedEvent}    

@router.get('/allEvents')
async def getEvents(db: Session = Depends(get_db)):
      allEvents = db.query(event).all()
      print(allEvents)
      return allEvents
      
app.include_router(router)