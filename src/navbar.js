import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter as Router } from 'react-router';

import {
  makeStyles,
  withStyles
} from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ListIcon from '@material-ui/icons/FormatListBulleted';
import VisionIcon from '@material-ui/icons/Visibility';
import PostureIcon from '@material-ui/icons/AccessibilityNew';
import AlarmIcon from '@material-ui/icons/Alarm';
import SettingsIcon from '@material-ui/icons/Settings';

import Workflow from './taskList';
import Vision from './visiontimer';
import Posture from './standTimer';
import Custom from './customTime';
import Settings from './settings';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;
  return (
    <div
      role='tabpanel'
      hidden={ value !== index }
      id={ `nav-tabpanel-${index}` }
      aria-labelledby={ `nav-tab-${index}` }
      {...other}
    >
      {value === index && (
        <Box p={ 5 }>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component='a'
      onClick={ (event) => {
        event.preventDefault();
      } }
      {...props}
    />
  );
}
const useStyles = makeStyles(() => ({
  appContainer: {
    background: 'linear-gradient(130deg, #B2D1DD 0%, #406371 100%)',
    height: '100%',
    maxWidth: '100%',
  },
  navPaper: {
    width: '100%',
    maxWidth: 960,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  root: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={ classes.navPaper }>
        <AppBar position='static'>
          <Tabs
            variant='fullWidth'
            value={ value }
            onChange={ handleChange }
            aria-label='nav tabs example'
          >
            <LinkTab icon={ <ListIcon /> } label='Workflow' href='/Workflow' {...a11yProps(0)} />
            <LinkTab icon={ <VisionIcon /> } label='Vision' href='/Vision' {...a11yProps(1)} />
            <LinkTab icon={ <PostureIcon /> } label='Posture' href='/Posture' {...a11yProps(2)} />
            <LinkTab icon={ <AlarmIcon /> } label='Custom' href='/Custom' {...a11yProps(3)} />
            <LinkTab icon={ <SettingsIcon /> } label='Settings' href='/Settings' {...a11yProps(4)} />
          </Tabs>
        </AppBar>
        <Router>
          <TabPanel value={ value } index={ 0 }>
            <Workflow />
          </TabPanel>
          <TabPanel value={ value } index={ 1 }>
            <Vision />
          </TabPanel>
          <TabPanel value={ value } index={ 2 }>
            <Posture />
          </TabPanel>
          <TabPanel value={ value } index={ 3 }>
            <Custom />
          </TabPanel>
          <TabPanel value={ value } index={ 4 }>
            <Settings />
          </TabPanel>
        </Router>
      </div>
    </>
  );
};

export default NavBar;