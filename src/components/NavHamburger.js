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
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import categories from '../data/category';
import sortBy from '../data/sortBy';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function NavHamburger({ setCategory, setSearchType, setSortBy ,setFromDate,setToDate}) {
  const [state, setState] = React.useState({
    left: false,
    fromDate: null,
    toDate: null,
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

  const handleCaptalise = (text) => {
    let NewText = text.charAt(0).toUpperCase() + text.slice(1);
    return NewText;
  };

  const handleDatePickerClick = (event) => {
    // Prevent the click event from reaching the parent elements (including the drawer)
    event.stopPropagation();
  };

  const handleDatePickerKeyDown = (event) => {
    // Prevent the default behavior to stop the drawer from closing
    event.preventDefault();
    // Prevent the event from reaching the parent elements (including the drawer)
    event.stopPropagation();
  };
  const handleFromDateChange = (date) => {
    setState((prevState) => {
      return { ...prevState, fromDate: date };
    });  

    // Perform validation->check if toDate is earlier than fromDate
    if (state.toDate && date && date > state.toDate) {
      // console.error('Invalid date range: "To" date is earlier than "From" date');
      setState((prevState) => {
        return { ...prevState,fromDate:date, toDate: null };
      });
      setFromDate(date);  // Update using the latest state
      setToDate(null);  // Update using the latest state
    }else{
      // Notify the parent component about the "from" date change
      // console.log('date change applied');
      setFromDate(date);
      setToDate((prevToDate) => prevToDate);  // Update using the latest state
    }
  };

  const handleToDateChange = (date) => {  
    // Perform validation, e.g., check if fromDate is later than toDate
    if (state.fromDate && date && date < state.fromDate) {
      // console.error('Invalid date range: "To" date is earlier than "From" date');
      setState((prevState) => {
        return { ...prevState,fromDate:null, toDate: date };
      });
      setFromDate(null);  // Update using the latest state
      setToDate(date);  // Update using the latest state
    } else {
      setState((prevState) => {
        return { ...prevState, toDate: date };
      });
      // Notify the parent component about the "to" date change
      // console.log('date change applied');
      setFromDate(state.fromDate);  // Update using the latest state
      setToDate(date);  // Update using the latest state
    }
  };
  
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'left' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          Sort By
        </ListItem>
      </List>
      <Divider />
      <List>
        {sortBy.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => { setSortBy(text) }}>
              <ListItemText primary={text === "publishedAt" ? "Newest" : handleCaptalise(text)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>
          From
        </ListItem>
        <ListItem onClick={handleDatePickerClick} onKeyDown={handleDatePickerKeyDown}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
            value={state.fromDate}
            onChange={handleFromDateChange}
            />
          </LocalizationProvider>
        </ListItem>
        <ListItem>
          To
        </ListItem>
        <ListItem onClick={handleDatePickerClick} onKeyDown={handleDatePickerKeyDown}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
            value={state.toDate}
            onChange={handleToDateChange}
            />
          </LocalizationProvider>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          Categories
        </ListItem>
      </List>
      <Divider />
      <List>
        {categories.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => { setCategory(text); setSearchType("category"); }}>
              <ListItemText primary={handleCaptalise(text)} />
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
