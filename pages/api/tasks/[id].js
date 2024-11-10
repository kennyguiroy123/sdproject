// pages/api/tasks/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    try {
      const task = await prisma.task.findUnique({
        where: { id: parseInt(id) },
      });

      if (!task) return res.status(404).json({ error: 'Task not found' });

      res.status(200).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve task' });
    }
  } else if (method === 'PUT') {
  // Update task
  const { title, description, status } = req.body;

  try {
    // Ensure status is provided in the request body
    if (!status) {
      return res.status(400).json({ error: 'Status is required for update' });
    }

    // Update the task, including the status
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        title,        // Update title if provided
        description,  // Update description if provided
        status,       // Update status (this is the key change)
      },
    });

    // Send the updated task as the response
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update task' });
  }
  } else if (method === 'DELETE') {
    // Delete task
    try {
      await prisma.task.delete({ where: { id: parseInt(id) } });
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete task' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
