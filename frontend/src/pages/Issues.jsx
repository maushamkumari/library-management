import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaClock } from 'react-icons/fa';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Input, Select } from '../components/ui/Input';
import { DataTable } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';

const Issues = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [issues] = useState([
    { id: 1, student: 'John Doe', book: 'The Great Gatsby', issued: '2024-01-15', dueDate: '2024-02-15', status: 'active' },
    { id: 2, student: 'Jane Smith', book: 'Python Programming', issued: '2024-01-20', dueDate: '2024-02-20', status: 'active' },
  ]);

  const columns = [
    { key: 'student', label: 'Student', sortable: true },
    { key: 'book', label: 'Book', sortable: true },
    { key: 'issued', label: 'Issued Date', sortable: true },
    { key: 'dueDate', label: 'Due Date', sortable: true },
    { key: 'status', label: 'Status', render: (value) => <Badge variant={value === 'active' ? 'primary' : 'danger'}>{value}</Badge> },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Issue Books</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Track and manage book issues</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <FaPlus className="mr-2" /> Issue Book
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns} data={issues} searchable={true} />
        </CardContent>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Issue Book" size="lg">
        <form className="space-y-4">
          <Input label="Student" placeholder="Select student" required />
          <Input label="Book" placeholder="Select book" required />
          <Input label="Due Date" type="date" required />
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-900 dark:text-blue-300">Max 5 books per student</p>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};

export default Issues;
