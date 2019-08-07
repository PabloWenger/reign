import React, { useState, useEffect } from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';

export default function NewsTable() {
  const [data, setData] = useState([
    {
      id: 0,
      created_at: 0,
      title: null,
      url: '',
      author: null,
      status: 0
    }
  ]);

  useEffect(() => getNewsDB(), []);

  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto'
    },
    table: {
      minWidth: 650
    },
    icon: {
      margin: theme.spacing(1),
      fontSize: 32
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            backgroundColor: lighten('#fafafa', 0.85)
          }
        : {
            backgroundColor: '#fff'
          }
  }));
  const classes = useStyles();

  function getNewsDB() {
    fetch('http://localhost:3001/api/getData')
      .then(data => data.json())
      .then(res => setData(res.data));
  }

  function deletePost(idToDelete: number) {
    axios
      .post('http://localhost:3001/api/deletePost', {
        id: idToDelete,
        update: { status: 0 }
      })
      .then(() => getNewsDB());
  }

  function handleClickRow(url: string) {
    window.open(url, '_blank');
  }

  function handleClickDel(event: any, id: number) {
    event.stopPropagation();
    deletePost(id);
  }

  function formatData(someDate: any) {
    let date = moment(someDate);
    const today = moment().diff(date, 'days') === 0;
    const yesterday = moment().diff(date, 'days') === 1;

    if (yesterday) {
      return 'Yesterday';
    } else if (today) {
      return moment(date).format('hh:mm a');
    } else {
      return moment(date).format('ddd DD');
    }
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
          {data.map(row => (
            <TableRow
              onClick={e => handleClickRow(row.url)}
              hover
              key={row.id}
              className={'table-span hover_delete'}
            >
              <TableCell component="th" scope="row">
                <span>{row.title}</span>
              </TableCell>
              <TableCell align="left" className={'author'}>
                {row.author}
              </TableCell>
              <TableCell align="right">
                <span>{formatData(row.created_at)}</span>
              </TableCell>
              <TableCell align="right">
                <DeleteIcon
                  className={classes.icon}
                  onClick={e => handleClickDel(e, row.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
