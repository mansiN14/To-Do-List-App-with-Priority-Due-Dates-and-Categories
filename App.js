import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');       // useState for the task input
  const [tasks, setTasks] = useState([]);      // useState for the list of tasks
  const [currentTime, setCurrentTime] = useState('');
  const [alarmTime, setAlarmTime] = useState('');
  const [isAlarmSet, setIsAlarmSet] = useState(false);

  // Function to add a task to the list
  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask(''); // Reset input field after adding task
    }
  };

  // Function to delete a task
  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  // Function to update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString()); // Get the current time
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  // Function to check if the alarm time matches the current time
  useEffect(() => {
    if (isAlarmSet && alarmTime === currentTime) {
      alert('⏰ Time for your alarm!');
      setIsAlarmSet(false); // Reset alarm after it goes off
    }
  }, [currentTime, alarmTime, isAlarmSet]);

  // Function to set the alarm time
  const handleSetAlarm = () => {
    if (alarmTime.trim() !== '') {
      setIsAlarmSet(true); // Closing the setIsAlarmSet function correctly
    }
  };

  return (
    <div className="app">
      <h1>To-Do List 📝</h1>

      <div className="time-display">
        <p>Current Time: {currentTime}</p>
      </div>

      <div className="input-container">
        <input
          type="text"
          value={task}
          placeholder="Enter a task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <div className="alarm-container">
        <input
          type="time"
          value={alarmTime}
          onChange={(e) => setAlarmTime(e.target.value)}
        />
        <button onClick={handleSetAlarm}>Set Alarm</button>
        {isAlarmSet && <p>Alarm set for: {alarmTime}</p>}
      </div>

      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            {t}
            <button onClick={() => handleDeleteTask(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;