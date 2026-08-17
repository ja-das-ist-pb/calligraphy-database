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
