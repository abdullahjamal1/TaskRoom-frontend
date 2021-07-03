import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default function GroupCard({ groups, user, onDelete, onLeave }) {

  const classes = useStyles();
  const [anchor, setAnchor] = React.useState(null);
  const open = Boolean(anchor);

  const handleMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <Grid container direction="row" spacing={2}>
          {groups.map(group =>(
      <Grid item xs={12} sm={4}>

            <Card className={classes.root}>
      <CardHeader
        // avatar={
          // <Avatar aria-label="recipe" className={classes.avatar}>
          //   R
          // </Avatar>
        // }
        style={{fontSize: 10}}
        action={
          <IconButton aria-label="settings"
                     aria-haspopup="true"
                     onClick={handleMenu}>
            <MoreVertIcon />
          </IconButton>         
        }
        titleTypographyProps={{variant:'h6' }}
        title={<Link to={"groups/" + group._id} >{group.title}</Link>}
        subheader={   <Grid container spacing={4}><Grid item xs={1}> <Avatar alt={group.admin.name} aria-label="recipe" className={classes.avatar}/>
</Grid> <Grid item xs={10}><Grid>{group.admin.name}</Grid></Grid></Grid>}
      />
      
      {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
      {/* <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent> */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      <Menu
        id="settings"
        anchorEl={anchor}
        open={open}
        keepMounted
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><Link to={"groups/" + group._id}>View</Link></MenuItem>
        {user._id === group.admin._id &&(
          <>
          <MenuItem onClick={handleClose}><Link to={`groupForm/${group._id}`}>Update</Link></MenuItem>
          <MenuItem onClick={() => onDelete(group._id)} >Delete</MenuItem>
          </>
        )}
        {user._id !== group.admin._id && (
            <MenuItem onClick={() => onLeave(group._id)} >Unenroll</MenuItem>
        )}
      </Menu>
      </CardActions>
    </Card>
      </Grid>
          ))}
    </Grid>
    
  );
}



// import React from "react";
// import "../../App.css";
// import {
//   Card,
//   Col,
//   Row,
//   Dropdown,
//   ListGroup,
//   ListGroupItem,
// } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { makeStyles } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
// import { deepOrange, deepPurple } from '@material-ui/core/colors';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   orange: {
//     color: theme.palette.getContrastText(deepOrange[500]),
//     backgroundColor: deepOrange[500],
//   },
//   purple: {
//     color: theme.palette.getContrastText(deepPurple[500]),
//     backgroundColor: deepPurple[500],
//   },
// }));

// const GroupCard = ({ groups, user, onDelete, onLeave }) => {
//     const classes = useStyles();
//   return (
//     <div className="row">
//       {groups.map((group) => (
//         <div className="col-sm-4 col-xs-10 mt-4">
//           <Card
//             // bg={group.theme.toLowerCase()}
//             key={group._id}
//             border={group.theme.toLowerCase()}
//             // text={group.theme.toLowerCase() === "light" ? "dark" : "white"}
//             // style={{ width: "25rem" }}
//             className="shadow bg-body rounded"
//           >
//             <Card.Body>
//               <Card.Title>
//                 <Row>
//                   {" "}
//                   <Col md={10}>
//                     <Link
//                       to={"groups/" + group._id}
//                       className={`text-${group.theme.toLowerCase()}`}
//                     >
//                       {group.title}
//                     </Link>
//                   </Col>
//                   <Col md={{ span: 1, order: "last" }}>
//                     <Dropdown size="sm">
//                       <Dropdown.Toggle
//                         variant={group.theme.toLowerCase()}
//                         id="dropdown-basic"
//                         className="btn btn-sm"
//                       >
//                       </Dropdown.Toggle>
//                       <Dropdown.Menu>
//                         <Dropdown.Item>
//                           <Link to={"groups/" + group._id}>View</Link>
//                         </Dropdown.Item>
//                         {user._id === group.admin._id && (
//                           <>
//                             <Dropdown.Item>
//                               <Link to={`groupForm/${group._id}`}>Update</Link>
//                             </Dropdown.Item>
//                             <Dropdown.Item>
//                               <div onClick={() => onDelete(group._id)}>
//                                 Delete
//                               </div>
//                             </Dropdown.Item>
//                           </>
//                         )}
//                         {user._id !== group.admin._id && (
//                           <>
//                             <Dropdown.Item>
//                               <div onClick={() => onLeave(group._id)}>
//                                 Unenroll
//                               </div>
//                             </Dropdown.Item>
//                           </>
//                         )}
//                       </Dropdown.Menu>
//                     </Dropdown>
//                   </Col>
//                 </Row>
//               </Card.Title>
//                                 <Avatar/>
//                 {/* <Card.Subtitle className="mb-2 text-muted"> */}
// {group.admin.name}
//               <Link to={`/users/${group.admin.name}`}>
//                 {/* </Card.Subtitle> */}
//               </Link>
//             </Card.Body>
//           </Card>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GroupCard;
