import React from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";

import useStyles from "./styles";
import { AppDispatch, IPost } from "../../Types";
import { useAppDispatch } from "../../redux/hooks";
import { createPost } from "../../redux/actions/posts";

const Form = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();
  const classes = useStyles();
  const [postData, setPostData] = React.useState<IPost>({ creator: "", title: "", message: "", tags: "", selectedFile: "" });

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(createPost(postData));
  };

  const clear = () => {
    setPostData({ creator: "", title: "", message: "", tags: "", selectedFile: "" });
  };

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">Creating a Memory</Typography>
          <TextField
            name="creator"
            variant="outlined"
            label="Author"
            fullWidth
            value={postData.creator}
            onChange={(event) => setPostData({ ...postData, creator: event.target.value })}
          />
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(event) => setPostData({ ...postData, title: event.target.value })}
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            multiline
            minRows={4}
            value={postData.message}
            onChange={(event) => setPostData({ ...postData, message: event.target.value })}
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags (coma separated)"
            fullWidth
            value={postData.tags}
            onChange={(event) => setPostData({ ...postData, tags: event.target.value.split(",") })}
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }: { base64: string }) => setPostData({ ...postData, selectedFile: base64 })}
            />
          </div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
            Submit
          </Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
            Clear
          </Button>
        </form>
      </Paper>
    </React.Fragment>
  );
};

export default Form;
