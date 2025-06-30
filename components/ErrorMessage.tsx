export default function ErrorMessage({ message }: { message: string }) {
    return <div className="p-4 bg-red-100 text-red-700 rounded">{message}</div>;
  }