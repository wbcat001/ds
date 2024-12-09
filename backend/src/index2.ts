import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use(cors());
// タスク一覧取得
app.get('/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// タスクの追加
app.post('/tasks', async (req: Request, res: Response) => {
  const { title, description, dueDate } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate), // 期限を適切に設定
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
