import { useState, useEffect } from 'react';
import todoData from '../data/todo.json';

export default function TodoView({ lang }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const hiddenTasks = JSON.parse(localStorage.getItem('hiddenTasks') || '[]');
    setTasks(todoData.tasks.filter(t => !hiddenTasks.includes(t.id)));
  }, []);

  const deleteTask = (id) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    const hidden = JSON.parse(localStorage.getItem('hiddenTasks') || '[]');
    localStorage.setItem('hiddenTasks', JSON.stringify([...hidden, id]));
  };

  const reset = () => {
    localStorage.removeItem('hiddenTasks');
    setTasks(todoData.tasks);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="p-6 bg-white border-b flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black">{lang === 'zh' ? '行前清單' : 'To-do List'}</h1>
          <p className="text-gray-400 text-sm">Tap to complete</p>
        </div>
        <button onClick={reset} className="text-blue-500 text-sm font-bold">Reset</button>
      </div>

      <div className="p-4 space-y-3">
        {tasks.map(task => (
          <div key={task.id} onClick={() => deleteTask(task.id)}
            className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-all">
            <div className="w-6 h-6 border-2 border-blue-200 rounded-full" />
            <span className="font-medium text-gray-700">{task.text[lang]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}