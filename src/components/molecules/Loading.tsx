import React from 'react';

import './loading.scss';

type LoadingProps = {
  message: string;
}

const Loading = ({ message }: LoadingProps) => {
  return (
    <div className="loading-backdrop">
      <div className="loading-spinner-container">
        <div className="spinner"></div>
        <div className="loading-text">{ message }</div>
      </div>
    </div>
  );
}

export default Loading;
