import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import {createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import categories from '../data/category';
import sortBy from '../data/sortBy';

export default function NavHamburger({setCategory,setSearchType,setSortBy}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
 
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 200 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem>
              SortBy
          </ListItem>
      </List>
      <Divider />
      <List>
        {sortBy.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=>{setSortBy(text)}}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider/>
      <List>
          <ListItem>
              Categories
          </ListItem>
      </List>
      <Divider />
      <List>
        {categories.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=>{setCategory(text);setSearchType("category");}}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={'left'}>
        <Button onClick={toggleDrawer('left', true)}>
          <MenuIcon color="action" />
        </Button>
        <ThemeProvider theme={darkTheme}>
        <SwipeableDrawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
          onOpen={toggleDrawer('left', true)}
        >
          {list('left')}
        </SwipeableDrawer>
        </ThemeProvider>
      </React.Fragment>
    </div>
  );
}
