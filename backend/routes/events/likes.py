from fastapi import FastAPI, APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db, like, dbUser

app = FastAPI()
router = APIRouter(
    prefix='/events',
    tags=['events']
)

@router.post('/likes')
async def likes(name: str, email: str, likedEvent: str, db: Session = Depends(get_db)):
    user = db.query(dbUser).filter(dbUser.email == email).first()
    if user: 
        created_likes = like(name= name, email= email, liked_events= likedEvent)
        db.add(created_likes)
        db.commit()
        db.refresh(created_likes)
        return 'Likes are created'
    return 'Some problem occured'

@router.get('/getLikes')
async def getLikes(email: str, db: Session = Depends(get_db)):
    likes = list(db.query(like).filter(like.email == email).all())
    return likes

@router.delete('/deleteLikes')
async def deleteLike(email: str, title: str, db: Session = Depends(get_db)):
    likesList = list(db.query(like).filter(like.email == email).all())
    for e in likesList:
          if(e.liked_events == title):
                db.delete(e)
                db.commit()
                return 'Event Deleted'
    
app.include_router(router)