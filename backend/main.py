import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from databases.connection import Settings
from routers.users import user_router


app = FastAPI()
settings = Settings()

oritgins = [
    '*',
    'http://localhost',
    'http://localhost:3000',
]

app.add_middleware(
    CORSMiddleware, 
    allow_origins=oritgins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
    )

app.include_router(user_router, prefix='/user')

@app.on_event('startup')
async def init_db():
    await settings.initialize_database()

@app.get('/')
async def hame():
    return {'message': 'Welcome'}

if __name__ == "__main__":
    uvicorn.run("main:app", host='0.0.0.0', port=8000, reload=True)