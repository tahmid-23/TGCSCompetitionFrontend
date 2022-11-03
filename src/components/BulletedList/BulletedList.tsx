import { Children, PropsWithChildren } from 'react';

const BulletedList: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ul>
      {Children.map(children, (child) => {
        return <li>{child}</li>;
      })}
    </ul>
  );
};

export default BulletedList;
