import { Component } from 'react';

import styles from './error-boundary.module.css';

interface Props {
  children: React.ReactNode;
}

interface State {
  error: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { error: error.message };
  }

  public render() {
    if (this.state.error) {
      return <p className={styles.message}>{this.state.error}</p>;
    }

    return this.props.children;
  }
}
