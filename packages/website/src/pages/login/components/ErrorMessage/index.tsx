import React from 'react';

import { ReactComponent as Error } from '../../assets/error.svg';
import style from './index.module.less';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={style.container}>
      <Error />
      {message}
    </div>
  );
};

export default ErrorMessage;
