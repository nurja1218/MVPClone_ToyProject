import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { useHistory } from 'react-router-dom';

export default function MainListItems(props: any) {
  const { getValue } = props
  const history = useHistory();

  const handleListItemClick = (e: any) => {
    const key = e.currentTarget.getAttribute("data-id");
    history.push(`/${key}`);
    getValue(e.currentTarget.getAttribute("data-name"))
  }

  return (
    <div>
      <ListItem button data-id='main' data-name='Main' onClick={handleListItemClick}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Main" />
      </ListItem>
      <ListItem button data-id='control' data-name='Control' onClick={handleListItemClick}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Control" />
      </ListItem>
      <ListItem button data-id='user' data-name='User' onClick={handleListItemClick}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="User" />
      </ListItem>
      <ListItem button data-id='settings' data-name='Settings' onClick={handleListItemClick}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </div>
  )
};