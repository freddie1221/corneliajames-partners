'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center my-auto">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}