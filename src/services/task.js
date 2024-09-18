import { getWebAppWithLogin, getWebAppWithoutLogin } from "./connector";

export async function getTasks() {
    return await loadTask();
  }

  async function loadTask() {
    try {
      const webApp = await getWebAppWithLogin();
      const data = await webApp.getTasks();
      return structuredTask(data);
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  export async function getCompletedTasks() {
    return await loadCompletedTask();
  }
  async function loadCompletedTask() {
    try {
      const webApp = await getWebAppWithLogin();
      const data = await webApp.getCompletedTasks();
      return structuredTask(data);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  function structuredTask(data) {
    const taskList = data.map((Task) => ({
      id: parseInt(Task.id),
      name: Task.name.toString(),
      url: Task.point.toString(),
      point: parseInt(Task.point),
    }));
    return taskList;
  }

