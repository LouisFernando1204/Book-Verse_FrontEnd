import { Await } from "react-router-dom";
import { Principal } from "@dfinity/principal";
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

  export async function getCompletedTasks(identity) {
    return await loadCompletedTask(identity);
  }

  async function loadCompletedTask(currentIdentity) {
    try {
      const webApp = await getWebAppWithLogin();
      console.log(currentIdentity)
      const data = await webApp.getCompletedTasks(Principal.fromText(currentIdentity));
      console.log(data)
      return await structuredTaskCompleted(data);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  export async function getIncompletetask(identity) {
    return await loadINCompletedTask(identity);
  }

  async function loadINCompletedTask(currentIdentity) {
    try {
      const webApp = await getWebAppWithLogin();
      console.log(currentIdentity)
      const data = await webApp.getCompletedTasks(Principal.fromText(currentIdentity));
      const data2 = await webApp.getTasks()
      if (structuredTaskINCompleted(data) === structuredTask(data)){
        return null;
      }else{
         return await structuredTaskINCompleted(data2);
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async function structuredTaskCompleted(data) {
    try {
        const webApp = await getWebAppWithLogin();
        const alltask = await webApp.getTasks();
        console.log(data)
        const taskList = data.map((id) => {
            console.log(id)

            const tasks = alltask.find((b) => b.id === id); 
            if (tasks) {
              return {
                id: parseInt(tasks.id),
      name: tasks.name.toString(),
      url: tasks.url.toString(),
      point: parseInt(tasks.point),
              };
            }
            return null; 
          }).filter(Boolean); 
          console.log(taskList);
      
          return taskList;
    
      } catch (error) {
        console.log(error);
        return []; 
      }
  }

  async function structuredTaskINCompleted(data) {
    try {
        const webApp = await getWebAppWithLogin();
        const alltask = await webApp.getTasks();
        const alltasks = structuredTask(alltask);
        console.log(data)
        const taskList = data.map((id) => {
            console.log(id)

            const tasks = alltasks.find((b) => b.id !== id); 
            if (tasks) {
              return {
                id: parseInt(tasks.id),
      name: tasks.name.toString(),
      url: tasks.url.toString(),
      point: parseInt(tasks.point),
              };
            }
            return null; 
          }).filter(Boolean); 
          console.log(taskList);
      
          return taskList;
      } catch (error) {
        console.log(error);
        return []; 
      }
  }

  function structuredTask(data) {
    const taskList = data.map((Task) => ({
      id: parseInt(Task.id),
      name: Task.name.toString(),
      url: Task.url.toString(),
      point: parseInt(Task.point),
    }));
    console.log(taskList)
    return taskList;
  }

 export const addCompletedTask = async(id) => {
    try{
        const webApp = await getWebAppWithLogin();
        await webApp.doTask(id);
    }catch(error){
        console.log(error)
    }
 }

