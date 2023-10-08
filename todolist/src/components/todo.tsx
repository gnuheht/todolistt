import { ChangeEvent, useState } from 'react';
import Task from '../layout/task';
import Toast from '../layout/toast';

const Todo = () => {
  const [contents, setContents] = useState({
    id: '',
    content: '',
    completed: false,
  });

  const [msg, setMsg] = useState<String>('');

  const [show, setShow] = useState<Boolean>(false);

  const [type, setType] = useState<string>('');

  const [chooseTaskID, setChooseTaskID] = useState<string>('');

  const [todolist, setTodolist] = useState([
    {
      id: 'Code 1',
      content: 'Code 1',
      completed: false,
    },
    {
      id: 'Code 2',
      content: 'Code 2',
      completed: false,
    },
    {
      id: 'Code 3',
      content: 'Code 3',
      completed: false,
    },
  ]);

  const handleClose = () => {
    setShow(false);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.name;

    setContents((prev) => {
      return {
        ...prev,
        [name]: e.target.value,
      };
    });
  };

  const handleAdd = () => {
    const checkLoop = todolist.some((todo) =>
      todo.content.includes(contents.content)
    );

    setShow(true);

    if (checkLoop == true) {
      setType('error');
      setMsg('Thêm thất bại');
    } else {
      setType('success');
      setMsg('Thêm thành công 1');
      setTodolist((prev: any) => {
        console.log('trc khi them :', prev);
        contents.id = contents.content;
        const newTodo = [...prev, contents];
        console.log('sau khi them : ', newTodo);
        return newTodo;
      });
    }
  };

  const handleDelete = (taskContent: string) => {
    setType('success');
    setMsg('Xóa thành công');
    setShow(true);
    setTodolist((prev) => {
      const newTodo = prev.filter((p) => p.content !== taskContent);
      return newTodo;
    });
  };

  const handleEditTodo = (newTaskContent: string) => {
    const checkLoop = todolist.some((todo) => todo.content === newTaskContent);

    setShow(true);

    if (checkLoop === true) {
      setType('error');
      setMsg('Sửa thất bại');
    } else {
      setType('success');
      setMsg('Sửa thành công');
      const checkID = todolist.findIndex((ele) => ele.id == chooseTaskID);
      setTodolist((prev) => {
        let newTodo = [...prev];
        newTodo[checkID] = {
          ...newTodo[checkID],
          id: newTaskContent,
          content: newTaskContent,
        };
        return newTodo;
      });
    }
  };

  const handleChooseTask = (id: string) => {
    setChooseTaskID(id);
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
              onChange={handleChangeInput}
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
          {todolist.map((todos, i) => {
            return (
              <Task
                key={`task-${i}`}
                content={todos.content}
                completed={todos.completed}
                onDelete={() => handleDelete(`${todos.content}`)}
                onEdit={() => handleChooseTask(`${todos.content}`)}
                onSendEdit={handleEditTodo}
              />
            );
          })}
        </ul>
      </div>
      {show && <Toast message={msg} type={`${type}`} onClose={handleClose} />}
    </>
  );
};

export default Todo;
