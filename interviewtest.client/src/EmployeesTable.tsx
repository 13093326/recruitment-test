import { useState } from 'react';
import styles from '../styles/App.module.css';
import { Employee } from './EmployeesPage';
import EmployeeRow from './EmployeeRow';
import AddEmployeeRow from './AddEmployeeRow';

type Props = {
    employees: Employee[];
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
};

function EmployeesTable({ employees, setEmployees }: Props) {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editName, setEditName] = useState('');
    const [editValue, setEditValue] = useState('');

    const handleEdit = (index: number) => {
        setEditingIndex(index);
        setEditName(employees[index].name);
        setEditValue(employees[index].value.toString());
    };

    const handleSave = async (index: number) => {
        const employee = employees[index];

        const parsedValue = Number(editValue);

        if (!Number.isInteger(parsedValue)) {
            alert('Value must be a whole number');
            return;
        }

        const response = await fetch('api/employee', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: employee.id,
                name: editName,
                value: parsedValue
            })
        });

        if (!response.ok) {
            alert('Failed to save');
            return;
        }

        const updated = [...employees];
        updated[index] = {
            ...employee,
            name: editName,
            value: parsedValue
        };

        setEmployees(updated);
        setEditingIndex(null);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this employee?')) return;

        const response = await fetch(`api/employee/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            setEmployees(prev => prev.filter(e => e.id !== id));
        }
    };

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((e, idx) => (
                    <EmployeeRow
                        key={e.id}
                        employee={e}
                        isEditing={editingIndex === idx}
                        editName={editName}
                        editValue={editValue}
                        onEdit={() => handleEdit(idx)}
                        onSave={() => handleSave(idx)}
                        onCancel={() => setEditingIndex(null)}
                        onDelete={() => handleDelete(e.id)}
                        setEditName={setEditName}
                        setEditValue={setEditValue}
                    />
                ))}

                <AddEmployeeRow setEmployees={setEmployees} />
            </tbody>
        </table>
    );
}

export default EmployeesTable;
