import React, { useState } from 'react';
import './App.css';

function App() {
  const [goal, setGoal] = useState('');
  const [goalsList, setGoalsList] = useState([]);

  // Add goal
  const handleAddGoal = () => {
    if (goal.trim() === '') return;

    setGoalsList([...goalsList, { text: goal, completed: false }]);
    setGoal('');
  };

  // Toggle complete
  const toggleComplete = (index) => {
    const updatedGoals = [...goalsList];
    updatedGoals[index].completed = !updatedGoals[index].completed;
    setGoalsList(updatedGoals);
  };

  // Delete goal
  const handleDelete = (index) => {
    const updatedGoals = goalsList.filter((_, i) => i !== index);
    setGoalsList(updatedGoals);
  };

  return (
    <div className="App">
      <h1>🎯 Daily Goals Tracker</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your goal..."
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <button onClick={handleAddGoal}>Add Goal</button>
      </div>

      <ul className="goals-list">
        {goalsList.map((item, index) => (
          <li key={index} className={item.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(index)}>{item.text}</span>
            <button onClick={() => handleDelete(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
