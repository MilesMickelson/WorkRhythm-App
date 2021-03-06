import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  fragmentContainer: {
    height: '100%',
    width: '100%',
    maxWidth: '960px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const Statistics = () => {
  const classes = useStyles();
  return (
    <div className={ classes.fragmentContainer }>
      <div>Hello, stats page!</div>
    </div>
  );
};

export default Statistics;
