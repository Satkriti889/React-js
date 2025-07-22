from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# CORS setup to allow React frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Expense(BaseModel):
    id: int
    title: str
    amount: float
    category: str
    date: str

expenses_db: List[Expense] = []

@app.get("/expenses")
def get_expenses():
    return expenses_db

@app.post("/expenses")
def add_expense(expense: Expense):
    expenses_db.append(expense)
    return {"message": "Expense added"}

@app.get("/insights")
def get_insights():
    total = sum(exp.amount for exp in expenses_db)
    food_total = sum(exp.amount for exp in expenses_db if exp.category.lower() == "food")
    tip = "You're spending a lot on food!" if food_total > total * 0.3 else "Spending looks good!"
    return {"total_spent": total, "tip": tip}
