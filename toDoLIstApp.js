import { LightningElement } from 'lwc';

export default class ToDoListApp extends LightningElement {
    taskname = "";
    taskdate = null;
    incompleteTask = [];
    completeTask = [];

    changeHandler(event) {
        let { name, value } = event.target;
        if (name === "taskname") {
            this.taskname = value;
        }
        if (name === "taskdate") {
            this.taskdate = value;
        }
    }

    resetHandler() {
        this.taskname = "";
        this.taskdate = null;
    }

    addTaskHandler() {
        // If task date is empty, then default date is today
        if (!this.taskdate) {
            this.taskdate = new Date().toISOString().slice(0, 10);
        }
        if (this.validateTask()) {
            this.incompleteTask = [
                ...this.incompleteTask,
                {
                    taskname: this.taskname,
                    taskdate: this.taskdate
                }
            ];
            this.resetHandler();
            let sortedArray = this.sortTask(this.incompleteTask);
            this.incompleteTask = [...sortedArray];
            console.log("this.incompleteTask", this.incompleteTask);
        }
    }

    validateTask() {
        let isValid = true;
        let element = this.template.querySelector(".taskname");

        if (!this.taskname) {
            // Task name is not provided
            isValid = false;
        } else {
            let taskItem = this.incompleteTask.find(
                (currItem) =>
                    currItem.taskname === this.taskname &&
                    currItem.taskdate === this.taskdate
            );
            if (taskItem) {
                isValid = false;
                element.setCustomValidity('Task is already available');
            }
        }
        if (isValid) {
            element.setCustomValidity("");
        }
        element.reportValidity();
        return isValid;
    }

    sortTask(inputArr) {
        let sortedArray = inputArr.sort((a, b) => {
            const dateA = new Date(a.taskdate);
            const dateB = new Date(b.taskdate);
            return dateA - dateB;
        });
        return sortedArray;
    }

    removalHandler(event) {
        let index = event.target.name;
        this.incompleteTask.splice(index, 1);
        let sortedArray = this.sortTask(this.incompleteTask);
        this.incompleteTask = [...sortedArray];
        console.log("this.incompleteTask", this.incompleteTask);
    }

    completetaskHandler(event) {
        let index = event.target.name;
        let removeItem = this.incompleteTask.splice(index, 1);
        let sortedArray = this.sortTask(this.incompleteTask);
        this.incompleteTask = [...sortedArray];
        console.log("this.incompleteTask", this.incompleteTask);

        this.completeTask = [...this.completeTask, removeItem[0]];
    }
}
