import { List, ListItem } from '@mui/material';
import { Children, PropsWithChildren } from 'react';

const BulletedList = ({ children }: PropsWithChildren) => {
  return (
    <List sx={{ listStyleType: 'disc', pl: 4 }}>
      {Children.map(children, (child) => {
        return <ListItem sx={{ display: 'list-item' }}>{child}</ListItem>;
      })}
    </List>
  );
};

export default BulletedList;
