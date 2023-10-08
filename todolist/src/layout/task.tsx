import { useState, ChangeEvent } from 'react';

type TaskContent = {
  content: string | null;
  completed: boolean;
  onDelete: Function;
  onEdit: Function;
  onSendEdit: Function;
};

const Task = (contents: TaskContent) => {
  const { content, completed, onDelete, onEdit, onSendEdit } = contents;

  const [check, setCheck] = useState<boolean>(completed);

  const [edit, setEdit] = useState<boolean>(false);

  const [valEdit, setValEdit] = useState<string | undefined>('');

  const handleValEdit = (e: ChangeEvent<HTMLInputElement>) => {
    setValEdit(e.target.value);
  };

  const handleCheck = () => {
    setCheck((prev) => !prev);
  };

  const handleSendEdit = () => {
    onSendEdit(valEdit);
    setEdit(false);
  };

  const handleEdit = () => {
    onEdit();
    setEdit(true);
  };

  console.log('content task :', content);
  console.log(valEdit);

  return (
    <>
      {edit === true ? (
        <>
          <li className="py-4 flex flex-row justify-between">
            <div className="flex items-center">
              <div className="flex border-b-2 border-teal-500">
                <input
                  name="content"
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  value={valEdit}
                  placeholder={`${content}`}
                  onChange={handleValEdit}
                />
              </div>
              {/* <label className="ml-3  ">
                <span className="text-lg font-medium">{content}</span>
              </label> */}
            </div>

            <div className="flex w-fit">
              <button
                className={`bg-red-400 hover:bg-red-700 text-base border-1  text-white py-1 px-3 rounded m-1`}
                onClick={handleSendEdit}
              >
                Edit
              </button>
            </div>
          </li>
        </>
      ) : (
        <>
          <li className="py-4 flex flex-row justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className=" h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                defaultChecked={completed}
                onChange={() => handleCheck()}
              />
              <label className="ml-3 block text-gray-900">
                <span className="text-lg font-medium">{content}</span>
              </label>
            </div>

            <div className="flex w-fit">
              <button
                className={`bg-red-400 hover:bg-red-700 text-base border-1  text-white py-1 px-3 rounded m-1 ${
                  check ? 'flex' : 'hidden'
                }`}
                onClick={() => onDelete()}
              >
                Delete
              </button>
              <button
                className={`bg-red-400 hover:bg-red-700 text-base border-1  text-white py-1 px-3 rounded m-1`}
                onClick={handleEdit}
              >
                Edit
              </button>
            </div>
          </li>
        </>
      )}
    </>
  );
};

export default Task;
