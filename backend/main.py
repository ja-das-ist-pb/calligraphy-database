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
    search_type : str
    char : list[str]
    author : list[str] | None = None
    font : list[str] | None = None

class character (BaseModel):
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

    type_ = data.get("search_type")
    chars = data.get("char")
    authors = (None if data.get("author") is None
               else [calligrapher[au] for au in data.get("author")])
    fonts = (None if data.get("font") is None
             else [script[f] for f in data.get("font")])
    # return data
    return_data = {}
    
    if type_ == "calligraphy":
        for char in chars:
            rows = search_calligraphy(char, authors, fonts)
            return_data[char] = []

            if rows:

                for row in rows:
                    char_data = character(
                        author = row[2], 
                        font = row[3], 
                        path = row[4], 
                        creation = row[7]).model_dump()
                    return_data[char].append(char_data)

    
    return return_data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host = "127.0.0.1", port = 8000, reload=True)