import { FileDropZone } from './components/FileDropZone.jsx';
export default function App() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-center mb-8">PDF Metadata Manager</h1>
      <FileDropZone />
    </main>
  );
}
