import styles from '../styles/App.module.css';
import { Employee } from './EmployeesPage';

type Props = {
    employee: Employee;
    isEditing: boolean;
    editName: string;
    editValue: string;
    setEditName: (v: string) => void;
    setEditValue: (v: string) => void;
    onEdit: () => void;
    onSave: () => void;
    onCancel: () => void;
    onDelete: () => void;
};

function EmployeeRow({
    employee,
    isEditing,
    editName,
    editValue,
    setEditName,
    setEditValue,
    onEdit,
    onSave,
    onCancel,
    onDelete
}: Props) {
    return (
        <tr>
            {isEditing ? (
                <>
                    <td>
                        <input
                            className={styles.input}
                            value={editName}
                            onChange={e => setEditName(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            className={styles.input}
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                        />
                    </td>
                    <td>
                        <button className={styles.button} onClick={onSave}>Save</button>
                        <button className={styles.button} onClick={onCancel}>Cancel</button>
                    </td>
                </>
            ) : (
                <>
                    <td>{employee.name}</td>
                    <td>{employee.value}</td>
                    <td>
                        <button className={styles.button} onClick={onEdit}>Edit</button>
                        <button className={styles.buttonDanger} onClick={onDelete}>Delete</button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default EmployeeRow;
