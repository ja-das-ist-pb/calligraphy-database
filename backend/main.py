from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def root():
    return {'message' : 'hey yo fuck u!!!'}
