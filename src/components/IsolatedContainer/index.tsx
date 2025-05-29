import React, {  ReactNode } from "react";
import styles from './styles.module.css';

interface IsolatedContainerProps {
  children: ReactNode;
}

const IsolatedContainer: React.FC<IsolatedContainerProps> = ({ children }) => {
  return (
    <div className={styles.isolated}>
      {children}
    </div>
  );
};

export default IsolatedContainer;