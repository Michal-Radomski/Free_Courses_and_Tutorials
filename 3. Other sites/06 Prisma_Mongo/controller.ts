import { Request, RequestHandler, Response } from "express";

// Prisma
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Add Task
export const AddTask: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const tasksData = await prisma.tasks.create({
      data: {
        title: req.body.title,
        description: req.body.description,
      },
    });

    console.log({ tasksData });

    return res.status(201).json({ msg: "Task Registration successfully Completed!" });
  } catch (error) {
    console.log({ error });
    return res.status(400).json({ msg: "Unsuccessful Task Registration" });
  }
};

// Fetch All Tasks
export const FetchAllTasks: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const tasksData = await prisma.tasks.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
      },
    });

    return res.status(201).json(tasksData);
  } catch (error) {
    console.log({ error });
    return res.status(400).json({ msg: "Error Fetching Tasks" });
  }
};

// Fetch One Task by Id
export const FetchOneTask: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const tasksData = await prisma.tasks.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
      },
    });

    return res.status(201).json(tasksData);
  } catch (error) {
    console.log({ error });
    return res.status(400).json({ msg: "Error Fetching Task" });
  }
};

// Update One Task by Id
export const UpdateOneTask: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    await prisma.tasks.update({
      where: {
        id: req.params.id,
      },
      data: {
        title: req.body.title,
        description: req.body.description,
      },
    });

    return res.status(201).json({ msg: "Task successfully updated!!" });
  } catch (error) {
    console.log({ error });
    return res.status(400).json({ error, msg: "Error updating task" });
  }
};

// Delete One Task by Id
export const DeleteOneTask: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    await prisma.tasks.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(201).json({ msg: "Task successfully deleted!!" });
  } catch (error) {
    console.log({ error });
    return res.status(400).json({ error, msg: "Error deleting task" });
  }
};
