import React from 'react';
import { useContext } from 'react';
import TaskContext from '../context/task/taskContext';
import styles from './TasksCardSearchBox.module.css';

interface TasksCardSearchBoxProps {
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const TasksCardSearchBox = ({
	query,
	setQuery,
}: TasksCardSearchBoxProps) => {
	const taskContext = useContext(TaskContext);
	const { searchTasks } = taskContext;

	return (
		<div className={styles.SearchBox}>
			<input
				type="text"
				value={query}
				placeholder="Search Tasks"
				onChange={(e) => {
					setQuery(e.target.value);
					searchTasks(e.target.value.toLowerCase());
				}}
			/>
		</div>
	);
};

export default TasksCardSearchBox;
