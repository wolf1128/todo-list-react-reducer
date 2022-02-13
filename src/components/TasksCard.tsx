import React from 'react';
import styles from './TasksCard.module.css';
import SearchBox from './TasksCardSearchBox';
import Tabs from './TasksCardTabs';
import TasksCardList from './TasksCardList';

interface TaskListProps {
	onSearchTasks: (title: string) => void;
	currentTab: number;
	onUpdateSelectedTab: React.Dispatch<React.SetStateAction<number>>;
}

const TasksList = ({
	onSearchTasks,
	onUpdateSelectedTab,
	currentTab,
}: TaskListProps) => {
	const [query, setQuery] = React.useState('');

	return (
		<div className={styles.TasksCard}>
			<Tabs
				currentTab={currentTab}
				onUpdateSelectedTab={onUpdateSelectedTab}
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
