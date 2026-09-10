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
    console.error('Error capturado por el boundary:', error, info)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-abyss-950 p-8 text-center">
          <div>
            <h1 className="font-gothic text-3xl font-bold text-mist uppercase">
              Algo salio mal
            </h1>
            <p className="mt-3 text-abyss-400">
              La pagina encontro un error inesperado. Intenta recargar.
            </p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="mt-6 rounded-md bg-teal px-5 py-2 font-gothic text-sm font-semibold tracking-widest text-abyss-950 uppercase transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Reintentar
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}