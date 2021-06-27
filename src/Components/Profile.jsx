import React, { useState, useEffect } from "react";
import axios from "axios";

import { BASE_URL, APP_ID } from "./ApiData";

import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Modal,
  Grid,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    minWidth: 400,
    marginTop: "30%",
  },
  media: {
    minHeight: 180,
    maxHeight: 180,
  },
});

export default function Profile({ userId }) {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const info = async () => {
      await axios
        .get(`${BASE_URL}/user/${userId}`, { headers: { "app-id": APP_ID } })
        .then(({ data }) => setData(data))
        .catch(console.error);
    };
    info();
  }, []);

  return (
    <div>
      <Button onClick={handleOpen}>
        {data?.firstName} {data?.lastName}
      </Button>

      <Modal
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
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={data?.picture}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {data?.firstName} {data?.lastName}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Email: {data?.email}
                      <br />
                      Date of Birth:{" "}
                      {data?.dateOfBirth.replace("T", " ~ ").slice(0, 11)}
                      <br />
                      Gender: {data?.gender}
                      <br />
                      Location: {data?.location.country}, {data?.location.state}
                      ,{data?.location.city}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="secondary" onClick={handleOpen}>
                    Close
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}
