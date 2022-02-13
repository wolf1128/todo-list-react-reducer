import React from 'react';
import { useContext } from 'react';
import TaskContext from '../context/task/taskContext';
import styles from './TasksCardTabs.module.css';

interface TasksCardTabsProps {
	setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const TasksCardTabs = ({
	setQuery,
}: TasksCardTabsProps) => {
	const taskContext = useContext(TaskContext);
	const { selectedTab, changeTab } = taskContext;

	return (
		<div className={styles.Tabs}>
			<button
				style={selectedTab === 0 ? { backgroundColor: '#ccc' } : {}}
				onClick={() => {
					changeTab(0);
					setQuery('');
				}}
			>
				ALL
			</button>
			<button
				style={selectedTab === 1 ? { backgroundColor: '#ccc' } : {}}
				onClick={() => {
					changeTab(1);
					setQuery('');
				}}
			>
				COMPLETED
			</button>
			<button
				style={selectedTab === 2 ? { backgroundColor: '#ccc' } : {}}
				onClick={() => {
					changeTab(2);
					setQuery('');
				}}
			>
				TODO
			</button>
		</div>
	);
};

export default TasksCardTabs;
