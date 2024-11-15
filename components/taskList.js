import React from 'react';
import TaskItem from './taskItem';

const TaskList = ({ tasks, onEdit, onDelete, onSelect }) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
          onSelect={() => onSelect(task)}
        />
      ))}
    </div>
  );
};

export default TaskList;
