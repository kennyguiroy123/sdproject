const AppRoutes = {
    auth: {
      register: '/api/auth/register',
      login: '/api/auth/login',
    },
    tasks: {
      list: '/api/tasks',
      singleTask: (id) => `/api/tasks/${id}`,
      addTask: '/api/tasks/add', // POST method
      updateTask: (id) => `/api/tasks/${id}/update`, // PUT or PATCH method
      deleteTask: (id) => `/api/tasks/${id}/delete`, // DELETE method
    },
  };
  
  export default AppRoutes;
  