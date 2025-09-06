import { FileDropZone } from './components/FileDropZone.jsx';
import { Upload, FileText, Database, Sparkles } from 'lucide-react';
import { Toaster } from './components/ui/sonner.jsx';

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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                  PDF Metadata Manager
                </h1>
                <p className="text-muted-foreground">
                  Professional document management with intelligent metadata
                </p>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-500" />
                <span>PDF Only</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-500" />
                <span>Rich Metadata</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Smart Organization</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <FileDropZone />
        </div>
      </main>
      <footer className="border-t bg-muted/30 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="px-2 py-1 bg-background rounded-md border">PDF files only</span>
              <span className="px-2 py-1 bg-background rounded-md border">Max 10MB per file</span>
              <span className="px-2 py-1 bg-background rounded-md border">Advanced metadata support</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Organize your documents with powerful metadata management and intelligent search
            </p>
          </div>
        </div>
      </footer>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </div>
  );
}