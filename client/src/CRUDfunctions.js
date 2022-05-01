import { Component } from "react";
import {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
} from "./CRUDexport";

class CRUDfunctions extends Component {
    state = { tasks: [], currentTask: "", currentDescription: ""};

    async componentDidMount() {
        try {
            const { data } = await getTasks();
            this.setState({ tasks: data });
        } catch (error) {
            console.log(error);
        }
    }

    /*handleChange = ({ currentTarget: input }) => {
        this.setState({ currentTask: input.value, currentDescription: input.value });
    };*/

    handleChangeTask = ({ currentTarget: input }) => {
        this.setState({ currentTask: input.value });
    };

    handleChangeDescription = ({ currentTarget: input }) => {
        this.setState({ currentDescription: input.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const originalTasks = this.state.tasks;
        try {
            const { data } = await addTask({ task: this.state.currentTask, description: this.state.currentDescription});
            const tasks = originalTasks;
            tasks.push(data);
            this.setState({ tasks, currentTask: "", currentDescription: ""});
        } catch (error) {
            console.log(error);
        }
    };

    handleUpdate = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = [...originalTasks];
            const index = tasks.findIndex((task) => task._id === currentTask);
            tasks[index] = { ...tasks[index] };
            tasks[index].completed = !tasks[index].completed;
            this.setState({ tasks});
            await updateTask(currentTask, {
                completed: tasks[index].completed,
            });
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };

    handleDelete = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = originalTasks.filter(
                (task) => task._id !== currentTask
            );
            this.setState({ tasks });
            await deleteTask(currentTask);
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };
}

export default CRUDfunctions;