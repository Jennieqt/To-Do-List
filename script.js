document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const timeInput = document.getElementById('todo-time');
    const list = document.getElementById('todo-list');
  
    // Load tasks from local storage
    loadTasks();
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      addTask(input.value, timeInput.value);
      input.value = '';
    });
  
    list.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        deleteTask(e.target.parentElement);
      } else if (e.target.classList.contains('edit-btn')) {
        editTask(e.target.parentElement);
      }
    });
  
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach((task) => {
        createTaskElement(task.text, task.time);
      });
    }
  
    function addTask(task, time) {
      if (task.trim() === '') {
        alert('Please enter a task');
        return;
      }
  
      createTaskElement(task, time);
  
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push({ text: task, time: time });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function createTaskElement(task, time) {
      const li = document.createElement('li');
      li.innerHTML = `${task} - ${time}`;
  
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.classList.add('edit-btn');
  
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete-btn');
  
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    }
  
    function editTask(taskElement) {
      const oldTask = taskElement.innerHTML.slice(0, -11);
      const oldTime = taskElement.innerHTML.slice(0, -11).split(' - ')[1];
      const newTask = prompt('Edit task:', oldTask.split(' - ')[0]);
      const newTime = prompt('Edit time:', oldTime);
  
      if (newTask !== null && newTask.trim() !== '' && newTime !== null) {
        taskElement.firstChild.textContent = `${newTask} - ${newTime}`;
  
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.findIndex((t) => t.text === oldTask.split(' - ')[0] && t.time === oldTime);
        tasks[taskIndex] = { text: newTask, time: newTime };
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    }
  
    function deleteTask(taskElement) {
      const task = taskElement.innerHTML.slice(0, -11).split(' - ')[0];
      const time = taskElement.innerHTML.slice(0, -11).split(' - ')[1];
      taskElement.remove();
  
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const updatedTasks = tasks.filter((t) => t.text !== task || t.time !== time);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  });
  const sunBtn = document.getElementById('sun-btn');
  const moonBtn = document.getElementById('moon-btn');
  
  sunBtn.addEventListener('click', () => {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  });
  
  moonBtn.addEventListener('click', () => {
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  });
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
    
  