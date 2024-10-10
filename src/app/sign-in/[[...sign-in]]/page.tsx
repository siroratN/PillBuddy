import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='flex items-center justify-center flex-col gap-10'>
      <div className='mt-28'>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: 'bg-green-600 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded shadow-md border-none',
              card: 'shadow-lg border border-gray-200 rounded-lg',
              headerTitle: 'text-xl font-bold text-gray-800',
              formFieldInput: 'border border-gray-300 p-2 rounded-md',
            },
          }}
        />
      </div>
    </div>
  );
}
