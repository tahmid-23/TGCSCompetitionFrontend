import { Children, PropsWithChildren } from 'react';
import styles from './BulletedList.module.css';

const BulletedList = (
  {
    children
  }: PropsWithChildren
) => {
  return (
    <ul className={styles.smirkList}>
      {Children.map(children, (child) => {
        return <li>{child}</li>;
      })}
    </ul>
  );
};

export default BulletedList;
