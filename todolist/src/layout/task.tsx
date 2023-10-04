import { useState, memo } from 'react';

type TaskContent = {
  content: string | null;
  completed: boolean;
};

const Task = (contents: TaskContent) => {
  const { content, completed } = contents;
  const [check, setCheck] = useState(completed);

  const handleCheck = () => {
    setCheck((prev) => !prev);
  };

  return (
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

        <button
          className={`bg-red-400 hover:bg-red-700 text-base border-1  text-white py-1 px-3 rounded ${
            check ? 'flex' : 'hidden'
          }`}
        >
          Delete
        </button>
      </li>
    </>
  );
};

export default memo(Task);
