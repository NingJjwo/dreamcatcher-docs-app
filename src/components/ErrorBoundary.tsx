import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Error captured by the boundary:', error, info)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div role="alert" className="flex min-h-screen items-center justify-center bg-abyss-950 p-8 text-center">
          <div>
            <h1 className="font-headline text-3xl font-bold text-mist uppercase">
              Something went wrong
            </h1>
            <p className="mt-3 text-abyss-400">
              The page ran into an unexpected error. Try reloading.
            </p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="mt-6 rounded-md bg-gold px-5 py-2 font-headline text-sm font-semibold tracking-widest text-abyss-950 uppercase transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Retry
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}