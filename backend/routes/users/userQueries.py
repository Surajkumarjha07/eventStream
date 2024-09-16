from fastapi import FastAPI, APIRouter,HTTPException,status,Depends
from models import CreateUser
from sqlalchemy.orm import Session
from database import dbUser,get_db

app = FastAPI()
router = APIRouter(
    prefix='/user',
    tags=['user']
)

@router.post('/signUp')
async def signUp(user: CreateUser, db: Session = Depends(get_db)):
    if(user.name and user.email and user.password ):
        newUser = dbUser(name = user.name, email = user.email, password = user.password)
        db.add(newUser)
        db.commit()
        db.refresh(newUser)
        return HTTPException(status_code=status.HTTP_201_CREATED, detail="User created")
    else:
        return HTTPException(status_code=status.HTTP_405_METHOD_NOT_ALLOWED, detail="User not created")
    
@router.post('/login')
async def login(email: str | None, password: str | None, db: Session = Depends(get_db)):
    token: str = 'xyzabc'
    if(email and password):
        db_user = db.query(dbUser).filter(dbUser.email == email).first()
        if(db_user and db_user.password == password):
            return token,db_user.name, HTTPException(status_code=status.HTTP_302_FOUND,detail="User logged in"),
        else:
            return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Incorrect email or password")
    return HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Please enter all the details")

@router.put('/updateUser')
async def updateUser(email: str,newName: str, newPassword: str, currentPassword: str, db: Session = Depends(get_db)):
    if(email and newName and currentPassword and newPassword):
        db_user = db.query(dbUser).filter(dbUser.email == email).first()
        if(db_user and db_user.password == currentPassword):
            db_user.name = newName
            db_user.password = newPassword
            db.commit()
            db.refresh(db_user)
            return HTTPException(status_code=status.HTTP_205_RESET_CONTENT, detail="User updated")
        else:
            return HTTPException(status_code=status.HTTP_304_NOT_MODIFIED, detail="Incorrect email or password")
    return HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Please enter details correctly")

@router.put('/updateEmail')
async def updateEmail(email: str , newEmail: str, password: str, db:Session = Depends(get_db)):
    if email and newEmail:
        user = db.query(dbUser).filter(dbUser.email == email).first()
        if user and user.password == password:
            user.email = newEmail
            db.commit()
            db.refresh(user)
            return 'Email Updated'
        else:
            return 'Incorrect Email or password'

@router.delete('/deleteUser')
async def deleteUser(email: str | None, password: str | None, db: Session = Depends(get_db)):
    if(email and password):
        db_user = db.query(dbUser).filter(dbUser.email == email).first()
        if(db_user and db_user.password == password):
            db.delete(db_user)
            db.commit()
            return HTTPException(status_code=status.HTTP_301_MOVED_PERMANENTLY, detail="User deleted")  
        else:
            return HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email or password")
    return HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Please enter details correctly")
    
app.include_router(router)