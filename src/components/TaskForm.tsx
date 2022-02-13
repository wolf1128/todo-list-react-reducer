import React from 'react';
import Input from './Input';
import styles from './TaskForm.module.css';
import { useContext } from 'react';
import TaskContext from '../context/task/taskContext';


const TaskForm = () => {
	const taskContext = useContext(TaskContext);
	const { addTask } = taskContext;

	const [newTask, setNewTask] = React.useState('');

	const addTaskHandler = (event: React.FormEvent) => {
		event.preventDefault();

		addTask(newTask);
		setNewTask('');
	};

	return (
		<form className={styles.Form} onSubmit={addTaskHandler}>
			<Input
				label={'New Task'}
				value={newTask.toLowerCase()}
				onChangeHandler={setNewTask}
			/>
			<button
				className={styles.Button}
				style={{ margin: '5px 0' }}
				type="submit"
				disabled={newTask.length === 0}
			>
				ADD
			</button>
		</form>
	);
};

export default TaskForm;
