import { FileDropZone } from './components/FileDropZone';
import { Upload, FileText, Database, Sparkles } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl shadow-lg">
                  <Upload className="w-7 h-7" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">PDF Metadata Manager</h1>
                <p className="text-muted-foreground">Smart PDF uploads with metadata</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-500" />
                <span>PDF Only</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-500" />
                <span>Metadata</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Smart Org</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <FileDropZone />
      </main>

      <footer className="border-t bg-muted/30 mt-20">
        <div className="container mx-auto px-4 py-8 text-center space-y-2 text-sm text-muted-foreground">
          <p>PDF only • Max 10MB • Enhanced metadata</p>
        </div>
      </footer>
    </div>
  );
}
