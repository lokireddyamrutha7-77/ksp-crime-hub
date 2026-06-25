from fastapi import APIRouter
from ml.criminal_profile import get_criminal_profile
from ml.most_wanted import get_most_wanted

router = APIRouter()

@router.get("/criminal/{criminal_id}")
def criminal_profile(criminal_id: str):
    return get_criminal_profile(criminal_id)

@router.get("/most-wanted")
def most_wanted():
    return get_most_wanted()