document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTask');
  const taskList = document.getElementById('taskList');
  const downloadTasksButton = document.getElementById('downloadTasks');

  addTaskButton.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });
  downloadTasksButton.addEventListener('click', downloadTasks);

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
      const timestamp = new Date().toLocaleString();
      const taskItem = createTaskElement(taskText, timestamp);
      taskList.appendChild(taskItem);
      taskInput.value = '';
    }
  }

  function createTaskElement(text, timestamp) {
    const li = document.createElement('li');
    li.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
      li.classList.toggle('completed', this.checked);
    });

    const taskTextSpan = document.createElement('span');
    taskTextSpan.className = 'task-text';
    taskTextSpan.textContent = text;

    const timestampSpan = document.createElement('span');
    timestampSpan.className = 'timestamp';
    timestampSpan.textContent = timestamp;

    li.appendChild(checkbox);
    li.appendChild(taskTextSpan);
    li.appendChild(timestampSpan);

    return li;
  }

  function downloadTasks() {
    let tasksText = '';
    taskList.querySelectorAll('.task-item').forEach((task, index) => {
      const checkbox = task.querySelector('input[type="checkbox"]');
      const taskText = task.querySelector('.task-text').textContent;
      const timestamp = task.querySelector('.timestamp').textContent;
      const status = checkbox.checked ? 'Completed' : 'Pending';
      tasksText += `${index + 1}. [${status}] ${taskText} (Added: ${timestamp})\n`;
    });

    const blob = new Blob([tasksText], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
});
