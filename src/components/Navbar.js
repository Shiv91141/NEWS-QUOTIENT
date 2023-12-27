import * as React from 'react';
import { styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import NavHamburger from './NavHamburger';

const Search = styled('form')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function SearchAppBar({ setCategory, setText, setSearchType, setSortBy, setFromDate, setToDate}) {
  const [currText, setCurrText] = React.useState('');

  const handleChange = (e) => {
    const newText = e.target.value || '';
    setCurrText(newText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setText(currText);
    setSearchType('default');
  };

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <NavHamburger 
            setCategory={setCategory} 
            setSearchType={setSearchType} 
            setSortBy={setSortBy}  
            setFromDate={setFromDate}
            setToDate={setToDate}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              NEWS QUOTIENT
            </Typography>
            <Search onSubmit={handleSubmit}>
              <SearchIconButton type="submit" aria-label="search">
                <SearchIcon />
              </SearchIconButton>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={currText}
                onChange={handleChange}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
  );
}
