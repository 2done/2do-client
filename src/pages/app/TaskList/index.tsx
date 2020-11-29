import React, { useEffect, useState } from "react"
import * as AccountService from '../../../services/AccountService'
import * as TaskService from '../../../services/TaskService'
import Task from "../../../components/task/Task"


interface TaskListParams {
  projectId: number;
}

const TaskList: React.FC<TaskListParams> = ({ projectId }) => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    TaskService
      .index(projectId)
      .then(async _tasks => {
        const accountIds = new Set(_tasks
          .map(task => task.assignedTo)
          .filter(accountId => accountId != null) as number[])

        await AccountService.cached.cacheAll(...accountIds);

        setTasks(_tasks);
      })
  }, [projectId])

  function create(form: HTMLFormElement) {
    TaskService
      .store(projectId, new FormData(form))
      .then(task => {
        setTasks([task, ...tasks])
        form.reset();
      });
  }

  return (
    <>
      <form className="Task New" onSubmit={e => { e.preventDefault(); create(e.currentTarget) }}>
        <input type="text" name="description" id="description" placeholder="type your new task here..." min="3" />
      </form>
      {tasks.map(task => <Task key={task.id} projectId={projectId} task={task} />)}
    </>
  )
}

export default TaskList