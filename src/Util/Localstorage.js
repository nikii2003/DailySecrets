 export const saveListToLocalStorage = (tasks) =>{
    localStorage.setItem('secrets', JSON.stringify(tasks))
   }