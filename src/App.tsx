import React, { useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TasksCard from './components/TasksCard';
import TaskState from './context/task/TaskState';

function App() {
	const [tasks, setTasks] = useState([
		// single source of truth
		{
			id: Number((new Date().getTime() * Math.random() * 10).toFixed(0)),
			title: 'Finish the javascript course',
			isFinished: false,
		},
		{
			id: Number((new Date().getTime() * Math.random() * 10).toFixed(0)),
			title: 'Finish the python course',
			isFinished: false,
		},
		{
			id: Number((new Date().getTime() * Math.random() * 10).toFixed(0)),
			title: 'Finish the React.js course',
			isFinished: false,
		},
		{
			id: Number((new Date().getTime() * Math.random() * 10).toFixed(0)),
			title: 'Finish the styled-components course',
			isFinished: false,
		},
	]);
	const [filteredTasks, setFilteredTasks] = useState<typeof tasks>([]);
	const [selectedTab, setSelectedTab] = React.useState(0);

	React.useEffect(() => {
		// NOTE: We always want fresh data for filtered ones.
		// NOTE: Don't call Hooks inside loops, conditions, or nested functions.
		//  Instead, always use Hooks at the top level of your React function, before any early returns.
		//  By following this rule, you ensure that Hooks are called in the same order each time a component renders.
		switch (selectedTab) {
			case 0:
				setFilteredTasks(tasks);
				break;
			case 1:
				setFilteredTasks(tasks.filter((task) => task.isFinished === true));
				break;
			case 2:
				setFilteredTasks(tasks.filter((task) => task.isFinished !== true));
				break;
			default:
				setFilteredTasks(tasks);
				break;
		}
	}, [tasks, selectedTab]);

	const searchTasksHandler = (title: string) => {
		setFilteredTasks(
			tasks.filter((task) => {
				if (title.length > 0) {
					if (selectedTab === 0) {
						return task.title.toLowerCase().match(title); // task status doesn't matter here.
					} else {
						const taskStatus = selectedTab === 1 ? true : false;

						return (
							task.title.toLowerCase().match(title) &&
							task.isFinished === taskStatus
						);
					}
				}

				setSelectedTab(0);
				return task;
			})
		);
	};

	return (
		<TaskState>
			<div className="container">
				<TaskForm />
				<TasksCard
					currentTab={selectedTab}
					onUpdateSelectedTab={setSelectedTab}
					onSearchTasks={searchTasksHandler}
				/>
			</div>
		</TaskState>
	);
}

export default App;
