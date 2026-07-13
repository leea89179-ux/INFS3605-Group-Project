import React, { ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-slate-900 border border-red-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-500">
              <ShieldAlert className="w-8 h-8 shrink-0" />
              <div>
                <h2 className="text-base font-bold text-slate-100">Prototype Runtime Exception</h2>
                <p className="text-xs text-rose-400">Something went wrong during rendering.</p>
              </div>
            </div>

            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-auto max-h-60 leading-normal">
              <p className="text-rose-400 font-bold mb-1">
                {this.state.error && this.state.error.toString()}
              </p>
              <pre className="whitespace-pre-wrap text-slate-400">
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              This interactive prototype encountered a component error. You can reset the state or try reloading the frame.
            </p>

            <button
              onClick={this.handleReset}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-rose-900/30"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
