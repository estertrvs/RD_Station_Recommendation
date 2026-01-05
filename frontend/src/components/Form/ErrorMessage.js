function ErrorMessage({ message }) {
  return (
    <div className="mt-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded p-3 text-center">
      {message}
    </div>
  );
}
export default ErrorMessage;
