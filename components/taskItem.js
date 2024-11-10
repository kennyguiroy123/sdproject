import React from 'react';

const TaskItem = ({ task, onEdit, onDelete, onSelect }) => {
  return (
    <div
      className="p-4 bg-gray-100 rounded-md shadow-md hover:bg-gray-200 cursor-pointer"
      onClick={onSelect}
    >
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="flex space-x-2 mt-2">
        <button onClick={onEdit} className="text-blue-500">Edit</button>
        <button onClick={onDelete} className="text-red-500">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
