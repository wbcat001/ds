import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';



const App: React.FC = () => {
    const [tasks, setTasks] = useState([]);
    const [upcomingTasks, setUpcomingTasks] = useState([]);


    useEffect(() => {
        fetch('http://localhost:5001/tasks')
            .then((response) => response.json())
            .then((data) => setTasks(data));
        //upcoming
        fetch('http://localhost:5001/tasks/upcoming')
        .then((response) => response.json())
        .then((data) => setUpcomingTasks(data));
    }, []);

    const handleAddTask = (title: string, description: string, dueDate: string) => {
        fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, dueDate }),
        }).then(() => {
            // Refresh tasks
            fetch('http://localhost:5001/tasks')
                .then((response) => response.json())
                .then((data) => setTasks(data));
        });
    };

    const handleCompleteTask = (id: number) => {
        fetch(`http://localhost:5000/tasks/${id}/complete`, { method: 'POST' }).then(() => {
            // Refresh tasks
            fetch('http://localhost:3000/tasks')
                .then((response) => response.json())
                .then((data) => setTasks(data));
        });
    };

    return (
        <div>
            <AddTaskForm onAdd={handleAddTask} />
            <TaskList tasks={upcomingTasks} onComplete={handleCompleteTask} />
            <TaskList tasks={tasks} onComplete={handleCompleteTask} />
            
        </div>
    );
};

export default App;
