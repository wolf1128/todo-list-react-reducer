import React, { useReducer } from 'react';
import {
	ADD_TASK,
	CHANGE_TAB,
	REMOVE_TASK,
	SEARCH_TASKS,
	UPDATE_FILTERED_TASKS,
	UPDATE_TASK_STATUS,
	UPDATE_TASK_TITLE,
} from '../types';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';

export const initialState = {
	selectedTab: 0,
	changeTab: (tabIndex: number) => {},
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
	filteredTasks: [
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
	addTask: (title: string) => {},
	removeTask: (taskId: number) => {},
	updateTaskTitle: (taskId: number, updatedTitle: string) => {},
	updateTaskStatus: (taskId: number) => {},
	searchTasks: (title: string) => {},
};

const TaskState = (props: { children: any }) => {
	// Note
	// React doesn’t use the state = initialState argument convention popularized by Redux. The initial value sometimes needs to depend on props and so is specified from the Hook call instead. If you feel strongly about this, you can call useReducer(reducer, undefined, reducer) to emulate the Redux behavior, but it’s not encouraged.
	const [state, dispatch] = useReducer(TaskReducer, initialState);

	const changeTab = (tabIndex: number) => {
		const payload = { selectedTab: tabIndex };

		dispatch({ type: CHANGE_TAB, payload: payload });
	};

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

	const updateFilteredTasks = (
		updatedTasks: typeof initialState.filteredTasks
	) => {
		const payload = {
			filteredTasks: updatedTasks,
		};

		dispatch({ type: UPDATE_FILTERED_TASKS, payload });
	};

	React.useEffect(() => {
		// NOTE: We always want fresh data for filtered ones.
		// NOTE: Don't call Hooks inside loops, conditions, or nested functions.
		//  Instead, always use Hooks at the top level of your React function, before any early returns.
		//  By following this rule, you ensure that Hooks are called in the same order each time a component renders.
		switch (state.selectedTab) {
			case 0:
				updateFilteredTasks(state.tasks!);
				break;
			case 1:
				updateFilteredTasks(
					state.tasks!.filter((task) => task.isFinished === true)
				);
				break;
			case 2:
				updateFilteredTasks(
					state.tasks!.filter((task) => task.isFinished !== true)
				);
				break;
			default:
				updateFilteredTasks(state.tasks!);
				break;
		}
	}, [state.tasks, state.selectedTab]);

	const searchTasks = (title: string) => {
		const payload = {
			filteredTasks: state.tasks!.filter((task) => {
				if (title.length > 0) {
					if (state.selectedTab === 0) {
						return task.title.toLowerCase().match(title); // task status doesn't matter here.
					} else {
						const taskStatus = state.selectedTab === 1 ? true : false;

						return (
							task.title.toLowerCase().match(title) &&
							task.isFinished === taskStatus
						);
					}
				}

				// Ensure we are at the first tab:
				changeTab(0);

				return task;
			}),
		};

		dispatch({ type: SEARCH_TASKS, payload });
	};

	return (
		<TaskContext.Provider
			value={{
				changeTab,
				selectedTab: state.selectedTab!,
				filteredTasks: state.filteredTasks!,
				tasks: state.tasks!,
				addTask,
				removeTask,
				updateTaskTitle,
				updateTaskStatus,
				searchTasks
			}}
		>
			{props.children}
		</TaskContext.Provider>
	);
};

export default TaskState;
