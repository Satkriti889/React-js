import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const API_BASE = "http://127.0.0.1:8000";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: "", amount: "", category: "", date: "" });
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    fetchExpenses();
    fetchInsights();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${API_BASE}/expenses`);
      setExpenses(res.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const fetchInsights = async () => {
    try {
      const res = await axios.get(`${API_BASE}/insights`);
      setInsights(res.data);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.category || !form.date) {
      alert("Please fill all fields");
      return;
    }

    const newExpense = { ...form, id: Date.now(), amount: parseFloat(form.amount) };
    try {
      await axios.post(`${API_BASE}/expenses`, newExpense);
      setForm({ title: "", amount: "", category: "", date: "" });
      fetchExpenses();
      fetchInsights();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Expense</button>
      </form>

      <h2>All Expenses</h2>
      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            {exp.date} - {exp.title} - Nrs : {exp.amount.toFixed(2)} ({exp.category})
          </li>
        ))}
      </ul>

      {insights && (
        <div className="insights">
          <h3>Total Spent: Nrs : {insights.total_spent.toFixed(2)}</h3>
          <p>Tip: {insights.tip}</p>
        </div>
      )}
    </div>
  );
}

export default App;
