import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='flex items-center justify-center flex-col gap-10'>
      <div className='mt-20'>
        <SignUp />
      </div>
    </div>
  );
}