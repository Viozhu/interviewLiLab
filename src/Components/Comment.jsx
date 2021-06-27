import React, { useState, useEffect } from "react";
import axios from "axios";

import { BASE_URL, APP_ID } from "./ApiData";

import { makeStyles } from "@material-ui/core/styles";
import ChatIcon from "@material-ui/icons/Chat";
import {
  Modal,
  Card,
  CardHeader,
  Divider,
  Button,
  Grid,
  CardContent,
  Avatar,
  Typography,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 450,
    minWidth: 400,
    margin: "1rem",
  },

  modalStyle1: {
    position: "absolute",
    top: "10%",
    left: "10%",
    overflow: "scroll",
    height: "100%",
    display: "block",
  },
  avatar: {
    backgroundColor: "#fff",
  },
}));

export default function Comment({ id }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const info = async () => {
      await axios
        .get(`${BASE_URL}/post/${id}/comment`, {
          headers: { "app-id": APP_ID },
        })
        .then(({ data }) => setData(data))
        .catch(console.error);
    };
    info();
  }, []);

  return (
    <div>
      <Button type="button" onClick={handleOpen}>
         
        <ChatIcon /> {data?.data.length}
      </Button>
      <Modal
        className={classes.modalStyle1}
        open={open}
        onClose={!open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid>
              {data &&
                data.data.map((p) => (
                  <Card className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          <img src={p.owner.picture} alt={p.owner.id} />
                        </Avatar>
                      }
                      title={`${p.owner.firstName} ${p.owner.lastName}`}
                      subheader={p.publishDate.replace("T", " ~ ").slice(0, 18)}
                    />

                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {p.message}
                      </Typography>
                      <br />
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      ></Typography>
                    </CardContent>
                    <Divider />
                  </Card>
                ))}{" "}
              <Button
                variant="contained"
                color="secondary"
                onClick={handleOpen}
                style={{ left: "40%" }}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}
