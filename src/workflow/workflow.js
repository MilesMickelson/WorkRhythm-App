import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

import InputForm from './inputForm';
import EnhancedTableToolbar from './tableToolbar';
import EnhancedTableHead from './tableHead';

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return - 1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => - descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

const useStyles = makeStyles((theme) => ({
  fragContainer: {
    height: '100%',
    width: '100%',
    maxWidth: 960,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tableWrap: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: 4,
    boxShadow: '0 0 0 2px #005269',
  },
  table: {
    width: '100%',
    minWidth: 760,
    maxWidth: 960,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: - 1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  border: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const WorkFlow = () => {
  const classes = useStyles();
  const [id, setId] = useState();
  const [key, setKey] = useState('');
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(0);
  const [recur, setRecur] = useState('');
  // const [due, setDue] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [actions, setActions] = useState('');
  const [invites, setInvites] = useState('');
  const [reminders, setReminders] = useState('');
  const [editing, setEditing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [open, setOpenDialog] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    setItemList(itemList);
  }, [itemList]);

  console.log('WORKFLOW STATE ID:', id);
  // eslint-disable-next-line no-console
  console.log('WORKFLOW STATE KEY:', key);
  // eslint-disable-next-line no-console
  console.log('WORKFLOW STATE Title:', title);
  // eslint-disable-next-line no-console
  console.log('WORKFLOW STATE Priority:', priority);
  // eslint-disable-next-line no-console
  console.log('WORKFLOW STATE itemList:', itemList);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handlePriority = (event) => {
    setPriority(event.target.value);
  };
  const handleRecur = (event) => {
    setRecur(event.target.value);
  };
  // const handleDue = (event) => {
  //   setDue(event.target.value);
  // };
  const handleNotes = (event) => {
    setNotes(event.target.value);
  };
  const handleActions = (event) => {
    setActions(event.target.value);
  };
  const handleInvites = (event) => {
    setInvites(event.target.value);
  };
  const handleReminders = (event) => {
    setReminders(event.target.value);
  };
  const handleEditing = () => {
    setEditing(! editing);
  };
  const handleCompleted = () => {
    setCompleted(! completed);
  };
  const handleExpandClick = () => {
    setExpanded(! expanded);
  };
  const handleShowInput = () => {
    setShowInput(! showInput);
  };
  const handleOpenDialog = () => {
    setOpenDialog(! open);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = itemList.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  // const handleClick = (event, index) => {
  //   const selectedIndex = selected.indexOf(index);
  //   let newSelected = [];
  //   if (selectedIndex === - 1) {
  //     newSelected = newSelected.concat(selected, index);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, - 1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }
  //   setSelected(newSelected);
  // };
  const handleSetKey = () => {
    const iKey = nanoid();
    setKey(iKey);
  };

  const addTodoItem = () => {
    handleSetKey();
    const newTodoItem = [
      ...itemList,
      {
        key,
        id,
        title,
        priority,
        recur,
        // due,
        notes,
        actions,
        invites,
        reminders
      }
    ];
    setItemList(newTodoItem);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodoItem(key, id, title, priority, recur, notes, actions, invites, reminders);
    setShowInput(! showInput);
    setTitle('');
    setPriority('');
    setRecur('');
    setNotes('');
    setActions('');
    setInvites('');
    setReminders('');
  };

  const handleCancelInput = (event) => {
    event.preventDefault();
    setShowInput(! showInput);
    setTitle('');
    setPriority('');
    setRecur('');
    setNotes('');
    setActions('');
    setInvites('');
    setReminders('');
  };
  // const isSelected = (index) => selected.indexOf(index) !== - 1;
  // const isItemSelected = isSelected(todoItem.index);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, itemList.length - page * rowsPerPage);

  return (
    <div className={ classes.fragContainer }>
      <Paper className={ classes.tableWrap }>
        <InputForm
          showInput={ showInput }
          tite={ title }
          priority={ priority }
          recur={ recur }
          notes={ notes }
          actions={ actions }
          invites={ invites }
          reminders={ reminders }
          // due={ due }
          open={ open }
          editing={ editing }
          completed={ completed }
          handleCancelInput={ handleCancelInput }
          handleSubmit={ handleSubmit }
          addTodoItem={ addTodoItem }
          handleTitle={ handleTitle }
          handlePriority={ handlePriority }
          handleRecur={ handleRecur }
          handleNotes={ handleNotes }
          handleActions={ handleActions }
          handleInvites={ handleInvites }
          handleReminders={ handleReminders }
          // handleDue={ handleDue }
          handleEditing={ handleEditing }
          handleCompleted={ handleCompleted }
          handleOpenDialog={ handleOpenDialog }
        />
        <EnhancedTableToolbar
          numSelected={ selected.length }
          showInput={ showInput }
          handleShowInput={ handleShowInput }
        />
        <TableContainer>
          <Table
            className={ classes.table }
            aria-labelledby='tableTitle'
            size={ dense ? 'small' : 'medium' }
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              classes={ classes }
              order={ order }
              orderBy={ orderBy }
              onSelectAllClick={ handleSelectAllClick }
              onRequestSort={ handleRequestSort }
              numSelected={ selected.length }
              rowCount={ itemList.length }
            />
            <TableBody>
              {itemList.map((todoItem, index) => (
                <>
                  <TableRow
                    key={ key }
                    id={ id }
                    index={ index }
                    tabIndex={ - 1 }
                    // aria-checked={ isItemSelected }
                    // selected={ isItemSelected }
                    className={ classes.border }
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        role='checkbox'
                        // onClick={ (event) => handleClick(event, todoItem.id) }
                        // checked={ isItemSelected }
                      />
                    </TableCell>
                    <TableCell
                      // style={ { textDecoration: todoItem.isCompleted ? 'line-through' : '' } }
                      align='left'
                      component='th'
                      scope='row'
                      padding='none'
                    >
                      {todoItem.title}
                    </TableCell>
                    <TableCell align='right'>{todoItem.priority}</TableCell>
                    <TableCell align='right'>{todoItem.recur}</TableCell>
                    <TableCell align='right'>{todoItem.timer}</TableCell>
                    {/* <TableCell align='right'>{todoItem.due}</TableCell> */}
                    <TableCell>
                      <IconButton
                        aria-label='show more'
                        aria-expanded={ expanded }
                        size='small'
                        onClick={ handleExpandClick }
                        className={ clsx(classes.expand, {
                          [classes.expandOpen]: expanded,
                        }) }
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    // key={ key }
                    // id={ id }
                    // index={ index }
                    tabIndex={ - 1 }
                    className={ classes.border }
                  >
                    <TableCell style={ { paddingBottom: 0, paddingTop: 0 } }>
                      <Collapse in={ expanded } timeout='auto' unmountOnExit>
                        <Box margin={ 1 }>
                          <Typography variant='h6' gutterBottom component='div'>
                            Details
                          </Typography>
                          <Table size='small' aria-label='purchases'>
                            <TableHead>
                              <TableRow>
                                <TableCell align='right'>Notes</TableCell>
                                <TableCell align='right'>Actions</TableCell>
                                <TableCell align='right'>Invites</TableCell>
                                <TableCell align='right'>Reminders</TableCell>
                                <TableCell align='right'>Added</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell align='right'>{todoItem.notes}</TableCell>
                                <TableCell align='right'>{todoItem.actions}</TableCell>
                                <TableCell align='right'>{todoItem.invites}</TableCell>
                                <TableCell align='right'>{todoItem.reminders}</TableCell>
                                <TableCell align='right'>{todoItem.added}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
            {emptyRows > 0 && (
              <TableBody>
                <TableRow style={ { height: (dense ? 33 : 53) * emptyRows } }>
                  <TableCell colSpan={ 6 } />
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={ [10, 20, 50] }
          component='div'
          count={ itemList.length }
          rowsPerPage={ rowsPerPage }
          page={ page }
          onChangePage={ handleChangePage }
          onChangeRowsPerPage={ handleChangeRowsPerPage }
        />
      </Paper>
      <FormControlLabel
        control={ <Switch checked={ dense } onChange={ handleChangeDense } /> }
        label='Condense'
      />
    </div>
  );
};
// {stableSort(itemList, getComparator(order, orderBy))
// .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
export default WorkFlow;
