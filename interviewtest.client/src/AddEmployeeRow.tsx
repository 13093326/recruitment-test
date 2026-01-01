import { useState } from 'react';
import styles from '../styles/App.module.css';
import { Employee } from './EmployeesPage';

type Props = {
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
};

function AddEmployeeRow({ setEmployees }: Props) {
    const [name, setName] = useState('');
    const [value, setValue] = useState('');

    const handleAdd = async () => {
        if (!name.trim()) return;

        const parsedValue = Number(value);
        if (!Number.isInteger(parsedValue)) {
            alert('Value must be a whole number');
            return;
        }

        const response = await fetch('/api/employee', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name.trim(),
                value: parsedValue
            })
        });

        if (!response.ok) {
            console.error('Failed to add employee');
            return;
        }

        const added: Employee = await response.json();

        setEmployees(prev => [...prev, added]);

        setName('');
        setValue('');
    };

    return (
        <tr>
            <td>
                <input value={name} onChange={e => setName(e.target.value)} />
            </td>
            <td>
                <input
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    type="number"
                />
            </td>
            <td>
                <button onClick={handleAdd}>Add</button>
            </td>
        </tr>
    );
}

export default AddEmployeeRow;
