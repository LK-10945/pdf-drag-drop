import { FileDropZone } from './PDFDropZone'
import { Toaster } from './components/ui/sonner'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <FileDropZone />
        </div>
      </main>
      <Toaster />
    </div>
  )
}
