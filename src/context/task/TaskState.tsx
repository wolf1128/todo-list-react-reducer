import { useReducer } from 'react';
import { ADD_TASK, REMOVE_TASK, UPDATE_TASK_STATUS, UPDATE_TASK_TITLE } from '../types';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';

export const initialState = {
	tasks: [
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
	],
	selectedTab: 0,
	addTask: (title: string) => {},
	removeTask: (taskId: number) => {},
	updateTaskTitle: (taskId: number, updatedTitle: string) => {},
	updateTaskStatus: (taskId: number) => {}
};

const TaskState = (props: { children: any }) => {
	const [state, dispatch] = useReducer(TaskReducer, initialState); // Note
	// React doesn’t use the state = initialState argument convention popularized by Redux. The initial value sometimes needs to depend on props and so is specified from the Hook call instead. If you feel strongly about this, you can call useReducer(reducer, undefined, reducer) to emulate the Redux behavior, but it’s not encouraged.

	const addTask = (title: string) => {
		const payload = {
			task: {
				id: Number((new Date().getTime() + Math.random() * 10).toFixed(0)),
				title,
				isFinished: false,
			},
		};

		dispatch({ type: ADD_TASK, payload: payload });
	};

	const removeTask = (taskId: number) => {
		const payload = {
			tasks: state.tasks!.filter((task) => task.id !== taskId),
			selectedTab: 0,
		};

		dispatch({ type: REMOVE_TASK, payload: payload });
	};

	const updateTaskTitle = (taskId: number, updatedTitle: string) => {
		const payload = {
			tasks: state.tasks!.map((task) =>
				task.id === taskId
					? { id: task.id, title: updatedTitle, isFinished: task.isFinished }
					: task
			),

			selectedTab: 0,
		};

		dispatch({ type: UPDATE_TASK_TITLE, payload: payload });
	};

	const updateTaskStatus = (todoId: number) => {
		const payload = {
			tasks: state.tasks!.map((todo) => {
				if (todo.id === todoId) {
					return {
						id: todo.id,
						title: todo.title,
						isFinished: !todo.isFinished,
					};
				}

				return todo;
			}),
		};

		dispatch({ type: UPDATE_TASK_STATUS, payload: payload });
	};

	return (
		<TaskContext.Provider
			value={{
				tasks: state.tasks!,
				selectedTab: state.selectedTab!,
				addTask,
				removeTask,
				updateTaskTitle,
				updateTaskStatus
			}}
		>
			{props.children}
		</TaskContext.Provider>
	);
};

export default TaskState;
