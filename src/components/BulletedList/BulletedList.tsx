import { Children, PropsWithChildren } from 'react';

const BulletedList: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      {Children.map(children, (child) => {
        return <li>{child}</li>;
      })}
    </div>
  );
};

export default BulletedList;
