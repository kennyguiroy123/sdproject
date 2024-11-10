import React from 'react';

const TaskDetails = ({ task }) => {
  return (
    <div className="w-1/3 p-4 border-l border-gray-300">
      <h2 className="text-xl font-bold">Task Details</h2>
      <p><strong>Title:</strong> {task.title}</p>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Due Date:</strong> {task.dueDate}</p>
    </div>
  );
};

export default TaskDetails;
