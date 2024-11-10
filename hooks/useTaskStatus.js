import React from 'react';
import { useTaskStatus } from './context/TaskStatusContext';

const TaskComponent = ({ task }) => {
  const { taskStatus, updateStatus } = useTaskStatus();
  const currentStatus = taskStatus[task.id] || 'Incomplete';

  const toggleStatus = () => {
    const newStatus = currentStatus === 'Incomplete' ? 'Completed' : 'Incomplete';
    updateStatus(task.id, newStatus);
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>Status: {currentStatus}</p>
      <button onClick={toggleStatus}>
        Mark as {currentStatus === 'Incomplete' ? 'Completed' : 'Incomplete'}
      </button>
    </div>
  );
};

export default TaskComponent;
