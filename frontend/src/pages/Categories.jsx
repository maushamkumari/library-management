import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { DataTable } from '../components/ui/Table';

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories] = useState([
    { id: 1, name: 'Fiction', description: 'Fictional stories and novels' },
    { id: 2, name: 'Academic', description: 'Educational and reference materials' },
    { id: 3, name: 'Non-Fiction', description: 'Non-fictional works' },
  ]);

  const columns = [
    { key: 'name', label: 'Category Name', sortable: true },
    { key: 'description', label: 'Description', sortable: false },
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
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage book categories</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <FaPlus className="mr-2" /> Add Category
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns} data={categories} searchable={true} />
        </CardContent>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Category" size="md">
        <form className="space-y-4">
          <Input label="Category Name" placeholder="Enter category name" required />
          <Input label="Description" placeholder="Enter description" />
        </form>
      </Modal>
    </motion.div>
  );
};

export default Categories;
