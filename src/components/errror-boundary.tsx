"use client"

import React from "react"
import { AlertTriangle } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: undefined }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("React boundary just said nah:", error, info)
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="w-full h-full flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center py-10 border-2 border-destructive">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-12 h-12 text-destructive" />
            </div>

            <CardTitle className="text-xl">
              Unexpected Error
            </CardTitle>

            <CardDescription className="text-sm">
              Something blew up harder than my GPA in 10th grade.  
              Try again maybe?
            </CardDescription>
          </CardHeader>

          <CardContent className="flex mx-auto items-center gap-2">
            <Button
            variant={"cdanger"}
            onClick={this.reset} className="mt-2">
              Reload Component
            </Button>
              <Button
              variant={"csecondary"}
              onClick={()=>window.history.back()} className="mt-2">
             Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
}
