import React, { FC } from 'react';

import './loading.scss';

type LoadingProps = {
  message: string;
}

const Loading: FC<LoadingProps> = ({ message }) => {
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
