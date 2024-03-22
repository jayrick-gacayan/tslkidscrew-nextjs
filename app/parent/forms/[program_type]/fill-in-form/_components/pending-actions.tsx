import Spinners3DotsScale from '@/app/_components/svg/spinners3-dots-scale';

export default function PendingAction() {
  return (
    <>
      <Spinners3DotsScale className='inline-block mr-1' />
      <span className='inline-block'>Checking</span>
    </>
  );
}