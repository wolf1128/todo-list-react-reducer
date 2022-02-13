import React from 'react';
import styles from './TasksCard.module.css';
import SearchBox from './TasksCardSearchBox';
import TasksCardTabs from './TasksCardTabs';
import TasksCardList from './TasksCardList';

interface TaskListProps {
	onSearchTasks: (title: string) => void;
}

const TasksList = ({
	onSearchTasks,
}: TaskListProps) => {
	const [query, setQuery] = React.useState('');

	return (
		<div className={styles.TasksCard}>
			<TasksCardTabs
				setQuery={setQuery}
			/>

			<SearchBox
				query={query}
				setQuery={setQuery}
				onSearchTasks={onSearchTasks}
			/>

			<TasksCardList />
		</div>
	);
};

export default TasksList;
