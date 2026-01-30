from fastapi import FastAPI
from table import (
    calligrapher, 
    script, 
    errtype,
    creation_dict
)
from crud import search_calligraphy
from pydantic import BaseModel

class SearchRequest (BaseModel):
    type : str
    char : list[str]
    author : list[str] | None = None
    font : list[str] | None = None

class character (BaseModel):
    char : str
    author : str
    font : str
    path : str
    creation : str | None

class creation (BaseModel):
    ...
    

app = FastAPI()

@app.post('/search-calligraphy')
def search(request : SearchRequest):
    data = request.model_dump()

    type_ = data.get("type")
    chars = data.get("char")
    authors = (None if data.get("author") is None
               else [calligrapher[au] for au in data.get("author")])
    fonts = (None if data.get("font") is None
             else [script[f] for f in data.get("font")])
    # return data
    return_data = []

    if type_ == "calligraphy":
        for char in chars:
            rows = search_calligraphy(char, authors, fonts)
            char_data = character(
                char = rows[1], 
                author = rows[2], 
                font = rows[3], 
                path = rows[4], 
                creation = rows[7]).model_dump()
            return_data.append(char_data)
    
    return return_data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host = "127.0.0.1", port = 8000, reload=True)