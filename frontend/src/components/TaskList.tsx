import React from 'react';

type Task = {
    id: number;
    title: string;
    description: string;
    
};

type TaskListProps = {
    tasks: Task[];
    onComplete: (id: number) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onComplete }) => {
    return (
        <div>
            <h2>Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <strong>{task.title}</strong> - {task.description}
                        <button onClick={() => onComplete(task.id)}>Complete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
