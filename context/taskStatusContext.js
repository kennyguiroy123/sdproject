import React, { createContext, useReducer, useContext } from 'react';

// Initial state and action types
const initialState = {};
const TaskStatusContext = createContext(initialState);

const taskStatusReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, [action.payload.id]: 'Incomplete' };
    case 'UPDATE_STATUS':
      return { ...state, [action.payload.id]: action.payload.status };
    case 'DELETE_TASK':
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    default:
      return state;
  }
};

// Provider component
export const TaskStatusProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskStatusReducer, initialState);

  // Add, update, and delete actions
  const addTask = (id) => dispatch({ type: 'ADD_TASK', payload: { id } });
  const updateStatus = (id, status) =>
    dispatch({ type: 'UPDATE_STATUS', payload: { id, status } });
  const deleteTask = (id) => dispatch({ type: 'DELETE_TASK', payload: { id } });

  return (
    <TaskStatusContext.Provider
      value={{ taskStatus: state, addTask, updateStatus, deleteTask }}
    >
      {children}
    </TaskStatusContext.Provider>
  );
};

// Hook to use the TaskStatusContext
export const useTaskStatus = () => {
  return useContext(TaskStatusContext);
};
