import React, { useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

export const Table = ({ columns, data, onRowClick, isLoading }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [data, sortConfig]);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-light-border dark:border-dark-border bg-slate-50 dark:bg-slate-800">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300"
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-2 cursor-pointer hover:text-primary-500 transition-colors">
                  {column.label}
                  {column.sortable && sortConfig.key === column.key && (
                    sortConfig.direction === 'asc' ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-light-border dark:divide-dark-border">
          {sortedData.map((row, idx) => (
            <motion.tr
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onRowClick?.(row)}
              className={clsx(
                'border-b border-light-border dark:border-dark-border',
                'hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors',
                onRowClick && 'cursor-pointer'
              )}
            >
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 text-sm text-light-text dark:text-dark-text">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="flex items-center justify-center py-12 text-slate-500 dark:text-slate-400">
          No data available
        </div>
      )}
    </div>
  );
};

export const DataTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  searchable = true,
  filterable = true,
  exportable = true,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      const matchSearch = !searchTerm || 
        Object.values(item).some(val =>
          val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchFilters = Object.entries(filters).every(([key, value]) =>
        !value || item[key] === value
      );

      return matchSearch && matchFilters;
    });
  }, [data, searchTerm, filters]);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      {(searchable || exportable) && (
        <div className="flex flex-col md:flex-row gap-4 items-end">
          {searchable && (
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          )}

          {exportable && (
            <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium text-sm">
              📥 Export
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-light-border dark:border-dark-border">
        <Table
          columns={columns}
          data={filteredData}
          onRowClick={(row) => onView?.(row)}
        />
      </div>

      {/* Results Info */}
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Showing {filteredData.length} of {data.length} results
      </p>
    </div>
  );
};
