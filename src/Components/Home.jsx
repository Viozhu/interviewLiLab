import React, { useEffect, useState } from "react";
import axios from "axios";

import Comment from "./Comment";
import Profile from "./Profile";
import Nav from "./Nav";
import { BASE_URL, APP_ID } from "./ApiData";

import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Divider,
  CardActions,
  Grid,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core/";

import { red } from "@material-ui/core/colors";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import LinkIcon from "@material-ui/icons/Link";

const useStyles = makeStyles((theme) => ({
  app: {
    background: "linear-gradient(90deg, #3F2B96 0%, #A8C0FF 100%);",
    margin: 0,
  },
  root: {
    minWidth: 600,
    maxWidth: 600,
    margin: "1rem",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Home() {
  const [data, setData] = useState(null);
  const classes = useStyles();
  const [filter, setFilter] = useState("");

  console.log(filter, "filtrado");
  useEffect(() => {
    const info = async () => {
      await axios
        .get(`${BASE_URL}/post`, { headers: { "app-id": APP_ID } })
        .then(({ data }) => setData(data))
        .catch(console.error);
    };
    info();
  }, []);
  console.log(data, "data");
  return (
    <div className={classes.app}>
      <Nav />
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid>
          {data &&
            data.data
              .filter((f) => {
                if (filter === "") {
                  return f;
                } else if (f.tags.includes(filter)) {
                  return f;
                }
                return undefined;
              })
              .map((p) => {
                return (
                  <Card className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          <img src={p.owner.picture} alt={p.owner.id} />
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <a
                            href={p.link}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <LinkIcon />
                          </a>
                        </IconButton>
                      }
                      title={<Profile userId={p.owner.id} />}
                      subheader={p.publishDate.replace("T", " ~ ").slice(0, 18)}
                    />
                    <CardMedia
                      className={classes.media}
                      image={p.image}
                      title="Paella dish"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {p.text}
                      </Typography>
                      <br />
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {p.tags.map((t) => (
                          <Button onClick={() => setFilter(t)}>#{t} </Button>
                        ))}
                      </Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Button>
                        <ThumbUpAltIcon style={{ fontSize: 23 }} /> {p.likes}
                      </Button>
                      <Typography
                        variant="h6"
                        style={{ margin: 0, alignItems: "center" }}
                      ></Typography>
                      <Comment id={p.id} />
                    </CardActions>
                  </Card>
                );
              })}
        </Grid>
      </Grid>
    </div>
  );
}
