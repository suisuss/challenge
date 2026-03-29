import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
  deleteStudent
} from './students-service';
import { env } from '../../config';

const handleGetAllStudents = asyncHandler(async (req: Request, res: Response) => {
  const { name, className, section, roll } = req.query as {
    name?: string;
    className?: string;
    section?: string;
    roll?: string;
  };
  const students = await getAllStudents({ name, className, section, roll });
  res.json({ students });
});

const handleAddStudent = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body;
  const message = await addNewStudent(payload);
  res.json(message);
});

const handleUpdateStudent = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const message = await updateStudent({ ...payload, userId: id });
  res.json(message);
});

const handleGetStudentDetail = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const student = await getStudentDetail(id);
  res.json(student);
});

const handleStudentStatus = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { status } = req.body;
  const { id: reviewerId } = req.user!;
  const message = await setStudentStatus({ userId, reviewerId, status });
  res.json(message);
});

const handleDeleteStudent = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const message = await deleteStudent(id);
  res.json(message);
});

const handleStudentReport = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const goServiceUrl = env.GO_SERVICE_URL;
  if (!goServiceUrl) {
    res.status(503).json({ error: 'report service unavailable' });
    return;
  }

  const upstream = await fetch(`${goServiceUrl}/api/v1/students/${id}/report`, {
    signal: AbortSignal.timeout(15_000)
  });
  if (!upstream.ok) {
    const body = await upstream.text();
    try {
      res.status(upstream.status).json(JSON.parse(body));
    } catch {
      res.status(upstream.status).json({ error: body || 'report generation failed' });
    }
    return;
  }

  res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    upstream.headers.get('content-disposition') || `attachment; filename="student-${id}-report.pdf"`
  );

  const buffer = Buffer.from(await upstream.arrayBuffer());
  res.send(buffer);
});

export {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
  handleDeleteStudent,
  handleStudentReport
};
