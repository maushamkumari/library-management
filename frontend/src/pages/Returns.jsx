import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { DataTable } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';

const Returns = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [returns] = useState([
    { id: 1, student: 'John Doe', book: 'The Great Gatsby', issueDate: '2024-01-15', dueDate: '2024-02-15', status: 'pending', fine: 0 },
    { id: 2, student: 'Jane Smith', book: 'Python Programming', issueDate: '2024-01-10', dueDate: '2024-02-10', status: 'overdue', fine: 50 },
  ]);

  const columns = [
    { key: 'student', label: 'Student', sortable: true },
    { key: 'book', label: 'Book', sortable: true },
    { key: 'dueDate', label: 'Due Date', sortable: true },
    { key: 'status', label: 'Status', render: (value) => <Badge variant={value === 'pending' ? 'warning' : 'danger'}>{value}</Badge> },
    { key: 'fine', label: 'Fine', render: (value) => <span className="font-semibold">₹{value}</span> },
    { key: 'actions', label: 'Action', render: () => <button className="p-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg"><FaCheck size={16} /></button> },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Return Books</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Accept book returns and calculate fines</p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns} data={returns} searchable={true} />
        </CardContent>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Accept Return" size="md">
        <form className="space-y-4">
          <Input label="Issue ID" placeholder="Select issue" required />
          <Input label="Return Date" type="date" required />
          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <p className="text-sm font-medium text-amber-900 dark:text-amber-300">Fine: ₹50</p>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};

export default Returns;
