export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 16px solid #01114a;
          border-radius: 50%;
          border-top: 16px solid #3498db;
          width: 120px;
          height: 120px;
          animation: spin 0.5s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}