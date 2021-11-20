import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {
  Link,
  useHistory
} from "react-router-dom";
import dayjs from 'dayjs';

import './App.css';

function App() {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    fetch("http://localhost:8000")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setBlogs(result.blogs);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  function handleNavigation(link) {
    history.push(link);
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Blog
            </Typography>
            <Button color="inherit" onClick={() => handleNavigation('/signin')}>Signin</Button>
            <Button color="inherit" onClick={() => handleNavigation('/signup')}>Signup</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="App">
        {
          blogs.map((blog, id) => {
            return (
              <Card style={{ margin: '20px' }} key={id}>
                <CardHeader
                  title={`${blog.user.firstName} ${blog.user.lastName}`}
                  subheader={dayjs(blog.createdAt).format('DD/MM/YYYY')}
                />
                <CardContent>
                  <Typography variant="h6" color="text.secondary">
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {blog.content}
                  </Typography>
                </CardContent>
              </Card>
            )
          })
        }
      </div>
    </>
  );
}

export default App;
