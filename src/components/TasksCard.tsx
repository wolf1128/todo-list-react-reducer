import React from 'react';
import styles from './TasksCard.module.css';
import SearchBox from './TasksCardSearchBox';
import Tabs from './TasksCardTabs';
import TasksCardList from './TasksCardList';


const TasksList = () => {
	const [query, setQuery] = React.useState('');

	return (
		<div className={styles.TasksCard}>
			<Tabs
				setQuery={setQuery}
			/>

			<SearchBox
				query={query}
				setQuery={setQuery}
			/>

			<TasksCardList />
		</div>
	);
};

export default TasksList;
