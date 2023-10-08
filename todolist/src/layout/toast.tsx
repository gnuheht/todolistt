import { useEffect } from 'react';
import { ToastSuccess, ToastError } from './icon';
type Toasts = {
  message: String;
  type: 'success' | 'error';
  onClose: () => void;
};

const Toast = (props: Toasts) => {
  const { message, type, onClose } = props;
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  console.log(' type toast : ', type);
  console.log(' prop type : ', message);

  return (
    <>
      {type === 'success' && (
        <div onClick={onClose}>
          <ToastSuccess msg={message} />
        </div>
      )}
      {type === 'error' && (
        <div onClick={onClose}>
          <ToastError msg={message} />
        </div>
      )}
    </>
  );
};

export default Toast;
