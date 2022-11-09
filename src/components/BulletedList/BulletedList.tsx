import { Children, PropsWithChildren } from 'react';
import styles from './BulletedList.module.css';

const BulletedList: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ul className={styles.smirkList}>
      {Children.map(children, (child) => {
        return <li>{child}</li>;
      })}
    </ul>
  );
};

export default BulletedList;
