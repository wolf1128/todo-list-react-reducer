import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TasksCard from './components/TasksCard';
import TaskState from './context/task/TaskState';

function App() {
	return (
		<TaskState>
			<div className="container">
				<TaskForm />
				<TasksCard />
			</div>
		</TaskState>
	);
}

export default App;
