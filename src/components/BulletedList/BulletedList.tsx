import { Children, PropsWithChildren } from 'react';

const BulletedList = ({ children }: PropsWithChildren) => {
  return (
    <ul>
      {Children.map(children, (child) => {
        return <li>{child}</li>;
      })}
    </ul>
  );
};

export default BulletedList;
