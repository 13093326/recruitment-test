import styles from '../styles/App.module.css';

type EmployeeSum = {
    group: string;
    totalValue: number;
};

type Props = {
    employeeSums: EmployeeSum[];
};

function EmployeeSumTable({ employeeSums }: Props) {
    if (employeeSums.length === 0) return null;

    return (
        <div className={styles.employeeBox}>
            <h3>Employee Totals (&gt;= 11171)</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Group</th>
                        <th>Total Value</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeSums.map(es => (
                        <tr key={es.group}>
                            <td>{es.group}</td>
                            <td>{es.totalValue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeSumTable;
