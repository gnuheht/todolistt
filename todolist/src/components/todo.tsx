import { ChangeEvent, useState } from 'react';
import Task from '../layout/task';
import Toast from '../layout/toast';

const Todo = () => {
  const [contents, setContents] = useState({
    content: '',
    completed: false,
  });
  const [todolist, setTodolist] = useState([
    {
      content: 'Code 1',
      completed: false,
    },
    {
      content: 'Code 2',
      completed: false,
    },
    {
      content: 'Code 3',
      completed: false,
    },
  ]);

  const [show, setShow] = useState(false);
  const [type, setType] = useState<String>('success' || 'error');

  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.name;
    setContents((prev) => {
      return {
        ...prev,
        [name]: e.target.value,
      };
    });
  };

  const handleAdd = () => {
    setShow(true);
    const checkLoop = todolist.some((todo) =>
      todo.content.includes(contents.content)
    );

    // console.log(checkLoop);

    if (checkLoop == true) {
      setType('error');
      console.log('setType');
    } else {
      console.log('setTodo');

      setType('success');

      setTodolist((prev: any) => {
        const newTodo = [...prev, contents];
        return newTodo;
      });
    }
  };

  const handleDelete = (i) => {
    setTodolist((prev) => {});
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
        <div className="px-4 py-2">
          <h1 className="text-gray-800 font-bold text-2xl uppercase">
            To-Do List
          </h1>
        </div>
        <div className="w-full max-w-sm mx-auto px-4 py-2">
          <div className="flex items-center border-b-2 border-teal-500 py-2">
            <input
              name="content"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              value={contents.content}
              placeholder="Add a task"
              onChange={handleChange}
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        </div>
        <ul className="divide-y divide-gray-200 px-4">
          {todolist.map((todos, i) => (
            <Task key={i} content={todos.content} completed={todos.completed} />
          ))}
        </ul>
      </div>
      {show && <Toast type={type} onClose={handleClose} />}
    </>
  );
};

export default Todo;
