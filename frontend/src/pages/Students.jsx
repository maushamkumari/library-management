import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { DataTable } from '../components/ui/Table';

const Students = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', rollNo: 'CS001', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', rollNo: 'CS002', status: 'active' },
  ]);

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'rollNo', label: 'Roll No.', sortable: false },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'actions', label: 'Actions', render: () => (
      <div className="flex gap-2">
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"><FaEdit size={16} /></button>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"><FaTrash size={16} /></button>
      </div>
    )},
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage student records</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <FaPlus className="mr-2" /> Add Student
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns} data={students} searchable={true} exportable={true} />
        </CardContent>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Student" size="lg">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Enrollment</th>
                <th>Department</th>
                <th>Semester</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr key={student.studentId || student.email}>
                  <td>{student.fullName}</td>
                  <td>{student.email}</td>
                  <td>{student.enrollmentNo}</td>
                  <td>{student.department}</td>
                  <td>{student.semester}</td>
                </tr>
              ))}
            </tbody>
          </table>
        <form className="space-y-4">
          <Input label="Full Name" placeholder="Enter name" required />
          <Input label="Email" type="email" placeholder="Enter email" required />
          <Input label="Roll Number" placeholder="Enter roll number" required />
          <Input label="Department" placeholder="Enter department" />
        </form>
      </Modal>
    </motion.div>
  );
    };

export default Students;