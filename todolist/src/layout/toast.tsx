import { useEffect } from 'react';
import { ToastSuccess, ToastError } from './icon';
type Toasts = {
  type: 'success' | 'error';
  onClose: () => void;
};

const Toast = (props: Toasts) => {
  const { type, onClose } = props;
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Change this value to control how long the toast is displayed

    return () => clearTimeout(timer);
  }, [onClose]);

  console.log(' type toast : ', type);
  console.log(' prop type : ', props.type);

  return (
    <>
      {type === 'success' && (
        <div onClick={onClose}>
          <ToastSuccess />
        </div>
      )}
      {type === 'error' && (
        <div onClick={onClose}>
          <ToastError />
        </div>
      )}
    </>
  );
};

export default Toast;
