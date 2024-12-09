import React, { useState } from 'react';

type AddTaskFormProps = {
    onAdd: (title: string, description: string, dueDate: string) => void;
};

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(title, description, dueDate);
        setTitle('');
        setDescription('');
        setDueDate("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="dueDate">Due Date:</label>
                <input
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTaskForm;
