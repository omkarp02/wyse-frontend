import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center space-y-6 max-w-lg">
        <div className="space-y-3">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
            <p className="font-medium mb-2">🚧 Prototype Website</p>
            <p className="text-sm">
              This is a prototype/demo website. The page you're looking for may not exist yet as it's still under development or was created as a placeholder for demonstration and presentation purposes.
            </p>
          </div>
          <p className="text-muted-foreground">
            Please focus on the main application flow and available features. Some links may be dummy placeholders for future functionality.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Explore Main Features</Link>
          </Button>
        </div>
     
      </div>
    </div>
  )
}