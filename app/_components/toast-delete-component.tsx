import { ToastContentProps } from 'react-toastify';

export default function ToastDeleteComponent<T>(props: { children: any & ToastContentProps<T> }) {
  const { children, ...rest } = props;

  return (
    <div className='text-black flex gap-2'>
      {children(rest)}
    </div>
  );
}