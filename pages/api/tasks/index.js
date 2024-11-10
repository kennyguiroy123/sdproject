// pages/api/tasks/index.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    const { title, description, userId } = req.body;

    if (!title || !description || !userId) {
      return res.status(400).json({ error: 'Title, description, and userId are required' });
    }

    try {
      const task = await prisma.task.create({
        data: {
          title,
          description,
          userId,
        },
      });
      res.status(201).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create task' });
    }
  } else if (method === 'GET') {
    // Get all tasks
    try {
      const tasks = await prisma.task.findMany();
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
