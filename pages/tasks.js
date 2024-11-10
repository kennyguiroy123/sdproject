// TaskPage.js
import React, { useState, useEffect } from 'react';
import Modal from '../components/modals';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import DashboardLayout from '../components/mainDashboardLayout';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskDetails, setTaskDetails] = useState(null);

  const handleFilterTitleChange = (event) => {
    setFilterTitle(event.target.value);
  };
  
  const handleFilterDateChange = (event) => {
    setFilterDate(event.target.value);
  };

  useEffect(() => {
    const filtered = tasks.filter((task) => {
      const matchesTitle = task.title.toLowerCase().includes(filterTitle.toLowerCase());
  
      if (!task.createdAt) {
        console.warn("Missing 'created_at' for task:", task);
        return false;
      }
  
      const taskDate = new Date(task.createdAt);
      
      if (isNaN(taskDate.getTime())) {
        console.warn("Invalid 'created_at' value for task:", task.createdAt);
        return false;
      }
  
      const taskDateString = taskDate.toISOString().split('T')[0]; 
  
      const filterDateString = filterDate ? new Date(filterDate).toISOString().split('T')[0] : null;
  
      const matchesDate = filterDate
        ? taskDateString === filterDateString
        : true;
  
      return matchesTitle && matchesDate;
    });
  
    setFilteredTasks(filtered);
  }, [filterTitle, filterDate, tasks]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data);
      setFilteredTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const openDeleteModal = (taskId) => {
    setTaskToDelete(taskId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  useEffect(() => {
    fetchTasks(); 
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredTasks(tasks);
    } else {
      const status = filter === 'Completed' ? 'Completed' : 'Incomplete';
      setFilteredTasks(tasks.filter((task) => task.status === status));
    }
  }, [filter, tasks]);

  const handleTaskSelect = (task) => {
    setTaskDetails(task); // Set the selected task details
  };

  const openModal = (task = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const handleCreateOrUpdate = async (taskData) => {
    if (!taskData.userId) {
      taskData.userId = 1; // Set default userId, or replace with actual logic
    }
  
    console.log('Task Data:', taskData);
  
    if (taskData.id) {
      // Update the task (PUT request)
      const response = await fetch(`/api/tasks/${taskData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
  
      const responseBody = await response.json();
    } else {
      // Create a new task (POST request)
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
  
      const responseBody = await response.json();
    }
    fetchTasks();
    closeModal();
  };

  const handleDeleteConfirmation = async () => {
    try {
      const response = await fetch(`/api/tasks/${taskToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== taskToDelete));
        setFilteredTasks(filteredTasks.filter(task => task.id !== taskToDelete));
        closeDeleteModal();
      } else {
        console.error("Error deleting task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex gap-6">
        {/* Left Column (Task List and Filters) */}
        <div className="w-2/3 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Task List</h2>

          <div className="mb-4 space-x-4">
            <button onClick={() => setFilter('All')} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">All</button>
            <button onClick={() => setFilter('Completed')} className="px-4 py-2 bg-green-200 rounded hover:bg-green-300">Completed</button>
            <button onClick={() => setFilter('Incomplete')} className="px-4 py-2 bg-red-200 rounded hover:bg-red-300">Incomplete</button>
            <label className="mr-2">Filter by Date:</label>
            <input
              type="date"
              value={filterDate}
              onChange={handleFilterDateChange}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          <div className="mb-4">
            <label className="mr-2">Filter by Title:</label>
            <input
              type="text"
              value={filterTitle}
              onChange={handleFilterTitleChange}
              placeholder="Search by title"
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={() => openModal()} className="ml-8 mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add Task
              </button>
          </div>

            <div className="mt-4">
              
            </div>
          </div>

          {/* Filters */}
          

          <div className="mb-4">
            
          </div>

          {/* Task List */}
          <TaskList
            tasks={filteredTasks}
            onEdit={openModal}
            onDelete={openDeleteModal}
            onSelect={handleTaskSelect}
          />

          {/* Delete Confirmation Modal */}
          <Modal
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
            onConfirm={handleDeleteConfirmation}
            title="Confirm Deletion"
            message="Are you sure you want to delete this task?"
          />
        </div>

        {/* Right Column (Task Details) */}
        <div className="w-1/3 p-6 bg-gray-50 rounded-lg shadow-lg">
          {taskDetails ? (
            <div>
              <h2 className="text-lg font-semibold mb-4">{taskDetails.title}</h2>
              <p className="text-gray-700">{taskDetails.description}</p>
              <p className="text-sm text-gray-500 mt-4">Status: {taskDetails.status}</p>
              <p className="text-sm text-gray-500 mt-4">ID User: {taskDetails.userId}</p>
              <p className="text-sm text-gray-500 mt-4">Due Date: {taskDetails.createdAt}</p>
            </div>
          ) : (
            <p className="text-gray-500">Select a task to view details</p>
          )}
        </div>
      </div>

      {/* Modal for Create/Edit Task */}
      {isModalOpen && (
        <TaskForm task={selectedTask} onSubmit={handleCreateOrUpdate} onClose={closeModal} />
      )}
    </DashboardLayout>
  );
};

export default TaskPage;
