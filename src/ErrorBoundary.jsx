import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console in development
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-error-warning-line text-3xl text-red-600"></i>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-600 mb-6 leading-relaxed" style={{ fontFamily: 'Arial, sans-serif' }}>
              We're sorry, but something unexpected happened. Our team has been notified and is working to fix this issue.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                <i className="ri-refresh-line mr-2"></i>
                Reload Page
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                <i className="ri-home-line mr-2"></i>
                Go to Home
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Error Details (Development Only)
                </summary>
                <div className="bg-gray-100 p-4 rounded-lg text-xs font-mono text-gray-800 overflow-auto max-h-40">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.toString()}
                  </div>
                  <div>
                    <strong>Stack Trace:</strong>
                    <pre className="whitespace-pre-wrap mt-1">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
