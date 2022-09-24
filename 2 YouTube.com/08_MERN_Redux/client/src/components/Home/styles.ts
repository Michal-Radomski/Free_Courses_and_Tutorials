import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
  },
  paginate: {
    borderRadius: 4,
    marginTop: "1rem",
    padding: "16px",
  },
  searchButton: {
    color: "lightyellow",
  },
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
}));

export default useStyles;
