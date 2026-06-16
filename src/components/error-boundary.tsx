import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#F8FAFC" }}>
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={28} className="text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-[#0F172A] mb-3">Something went wrong</h1>
            <p className="text-[#64748B] text-sm leading-relaxed mb-8">
              An unexpected error occurred. Please try refreshing the page, or contact us if the issue persists.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: "#1E5BFF" }}
              >
                <RefreshCw size={15} />
                Refresh Page
              </button>
              <a
                href="/"
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border border-slate-200 text-[#475569] hover:border-slate-300 transition-all"
              >
                Go to Homepage
              </a>
            </div>
            {import.meta.env.DEV && this.state.error && (
              <pre className="mt-8 text-left text-xs text-red-600 bg-red-50 border border-red-100 p-4 rounded-xl overflow-auto max-h-40">
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
