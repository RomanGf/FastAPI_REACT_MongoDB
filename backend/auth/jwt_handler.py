import time
from datetime import datetime
from databases.connection import Settings
from fastapi import HTTPException, status
from jose import jwt, JWTError


settings = Settings()


def create_access_token(user: str):
    payload = {
        'user': user,
        'expire': time.time()+4000
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token


def verify_access_token(token: str):
    try:
        data = jwt.encode(token, settings.SECRET_KEY, algorithm='HS256')
        expire = data.get('expire')

        if expire is None:
            raise HTTPException(
                status_code= status.HTTP_400_BAD_REQUEST,
                detail= "No access Token Supplied"
            )

        if datetime.utcnow() > datetime.utcfromtimestamp(expire):
            raise HTTPException(
                status_code= status.HTTP_403_FORBIDDEN,
                detail= "Token is expired"
            )
        
        return token

    except JWTError:
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail= 'Invalid token'
        )