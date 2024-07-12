import React, { ErrorInfo } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

interface ErrorBoundaryProps {
    children: React.ReactNode;
    message?: string;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,

        };

    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught in ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can customize the error message or render a fallback UI
            return <ErrorMessage message={this.props.message}></ErrorMessage>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;