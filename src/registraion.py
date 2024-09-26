from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer
from passlib.hash import pbkdf2_sha256 as sha256
import psycopg2;

app = FastAPI()

conn = psycopg2.connect(
    host="localhost",
    database="mydatabase",
    user="myuser",
    password="mypassword"
)

cur = conn.cursor()


class User(BaseModel):
    id: int
    email: str
    password: str

@app.post("/register")
async def register(user: User):
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE email = %s", (user.email,))
    existing_user = cur.fetchone()
    if existing_user:
        raise HTTPException(status_code=400, detail="Пользователь с таким email уже существует")

    # Создаем нового пользователя
    cur.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (user.email, user.password))
    conn.commit()
    conn.close()
    return {"message": "Регистрация успешна"}

class Token(BaseModel):
    access_token: str
    token_type: str


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

def verify_password(plain_password, hashed_password):
    return sha256.verify(plain_password, hashed_password)

@app.post("/login")
async def login(user: User, oauth2_scheme: OAuth2PasswordBearer = Depends(oauth2_scheme)):
    cur = conn.cursor()
    # Проверяем, существует ли пользователь с таким email
    cur.execute("SELECT * FROM users WHERE email = %s", (user.email,))
    existing_user = cur.fetchone()
    if not existing_user:
        raise HTTPException(status_code=400, detail="Неверный email или пароль")

    # Проверяем, совпадает ли пароль
    if not verify_password(user.password, existing_user[2]):
        raise HTTPException(status_code=400, detail="Неверный email или пароль")

    # Генерируем токен аутентификации
    access_token = oauth2_scheme.create_access_token(data={"sub": existing_user[1]})


    conn.close()
    return {"access_token": access_token, "token_type": "bearer"}
