import { useEffect, useState } from 'react';
import styles from '../styles/App.module.css';
import EmployeesTable from './EmployeesTable';
import EmployeeSumTable from './EmployeeSumTable';

export type Employee = {
    id: number;
    name: string;
    value: number;
};

type EmployeeSum = {
    group: string;
    totalValue: number;
};

function EmployeesPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [employeeSums, setEmployeeSums] = useState<EmployeeSum[]>([]);

    useEffect(() => {
        loadEmployees();
    }, []);

    async function loadEmployees() {
        const response = await fetch('api/employee');
        const data: Employee[] = await response.json();
        setEmployees(data);
    }

    const handleIncrementAll = async () => {
        const incrementRes = await fetch('api/employee/increment', {
            method: 'PUT',
        });

        if (!incrementRes.ok) {
            alert('Increment failed');
            return;
        }

        await loadEmployees();

        const sumRes = await fetch('api/employee/sum-abc');
        if (sumRes.ok) {
            const data: EmployeeSum[] = await sumRes.json();
            setEmployeeSums(data);
        }
    };

    return (
        <div className={styles.page}>
            <h2>Employees Table</h2>

            <div className={styles.actions}>
                <button className={styles.button} onClick={handleIncrementAll}>
                    Increment All
                </button>
            </div>

            <EmployeeSumTable employeeSums={employeeSums} />

            <EmployeesTable
                employees={employees}
                setEmployees={setEmployees}
            />
        </div>
    );
}

export default EmployeesPage;