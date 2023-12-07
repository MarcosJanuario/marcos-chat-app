import React from 'react';
import './loading.scss';
import { LoadingState } from '../../utils/types';

type LoadingProps = {
  loading: LoadingState;
}

const Loading = ({ loading }: LoadingProps) => {
  return (
    <div className="loading-backdrop">
      <div className="loading-spinner-container">
        <div className="spinner"></div>
        <div className="loading-text">{ loading.message }</div>
      </div>
    </div>
  );
}

export default Loading;
