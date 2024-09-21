import { Principal } from "@dfinity/principal";
import { getWebAppWithLogin } from "./connector";

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

export async function getCompletedTasks(identity) {
  return await loadCompletedTask(identity);
}

async function loadCompletedTask(currentIdentity) {
  try {
    const webApp = await getWebAppWithLogin();
    const data = await webApp.getCompletedTasks(Principal.fromText(currentIdentity));
    return await structuredTaskCompleted(data);
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getIncompletetask(identity) {
  return await loadIncompleteTask(identity);
}

async function loadIncompleteTask(currentIdentity) {
  try {
    const webApp = await getWebAppWithLogin();
    const completedTasks = await webApp.getCompletedTasks(Principal.fromText(currentIdentity));
    const allTasks = await webApp.getTasks();
    const completedTaskIds = new Set(completedTasks);
    return allTasks.filter(task => !completedTaskIds.has(task.id));
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function structuredTaskCompleted(data) {
  try {
    const webApp = await getWebAppWithLogin();
    const allTasks = await webApp.getTasks();
    const taskList = data.map((id) => {
      const task = allTasks.find((b) => b.id === id);
      return task ? {
        id: parseInt(task.id),
        name: task.name.toString(),
        url: task.url.toString(),
        point: parseInt(task.point),
      } : null;
    }).filter(Boolean);
    return taskList;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function structuredTask(data) {
  return data.map((task) => ({
    id: parseInt(task.id),
    name: task.name.toString(),
    url: task.url.toString(),
    point: parseInt(task.point),
  }));
}

export const addCompletedTask = async (id) => {
  try {
    const webApp = await getWebAppWithLogin();
    await webApp.doTask(id);
  } catch (error) {
    console.log(error);
  }
}
