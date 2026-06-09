import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { DataTable } from '../components/ui/Table';

const Books = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '978-0-7432-7356-5',
      category: 'Fiction',
      quantity: 5,
      available: 3,
      status: 'available',
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: '978-0-06-112008-4',
      category: 'Fiction',
      quantity: 3,
      available: 0,
      status: 'unavailable',
    },
    {
      id: 3,
      title: 'Python Programming',
      author: 'Guido van Rossum',
      isbn: '978-0-13-110362-7',
      category: 'Academic',
      quantity: 8,
      available: 5,
      status: 'available',
    },
  ]);

  const columns = [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'author', label: 'Author', sortable: true },
    { key: 'isbn', label: 'ISBN', sortable: false },
    { key: 'category', label: 'Category', sortable: true },
    {
      key: 'available',
      label: 'Available',
      render: (value, row) => (
        <Badge variant={value > 0 ? 'success' : 'danger'} size="sm">
          {value}/{row.quantity}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <FaEye size={16} className="text-blue-500" />
          </button>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <FaEdit size={16} className="text-yellow-500" />
          </button>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <FaTrash size={16} className="text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">Books</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your library catalog</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="w-full md:w-auto">
          <FaPlus className="mr-2" /> Add Book
        </Button>
      </div>

      {/* Data Table */}
      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={books}
            searchable={true}
            exportable={true}
          />
        </CardContent>
      </Card>

      {/* Add Book Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Book"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              Add Book
            </Button>
          </>
        }
      >
        <form className="space-y-4">
          <Input label="Title" placeholder="Enter book title" required />
          <Input label="Author" placeholder="Enter author name" required />
          <Input label="ISBN" placeholder="Enter ISBN" required />
          <Input label="Publisher" placeholder="Enter publisher" />
          <Input label="Category" placeholder="Select category" />
          <Input label="Quantity" type="number" placeholder="Enter quantity" required />
          <Input label="Shelf Location" placeholder="Enter shelf location" />
        </form>
      </Modal>
    </motion.div>
  );
};

export default Books;
