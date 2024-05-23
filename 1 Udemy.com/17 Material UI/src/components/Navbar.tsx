import React from "react";
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Grid,
  Tab,
  Tabs,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ShoppingCartCheckout } from "@mui/icons-material";

import DrawerComp from "./DrawerComp";

const Navbar = (): JSX.Element => {
  const theme: Theme = useTheme();
  // console.log("theme:", theme);
  const isMatch: boolean = useMediaQuery(theme.breakpoints.down("md"));
  // console.log({ isMatch });

  const [value, setValue] = React.useState<number>(0);

  const pages: string[] = ["Products", "Services", "ABoutUs", "ContactUs", "NewPage"];

  return (
    <React.Fragment>
      <AppBar
        sx={{
          background:
            "linear-gradient(90deg, rgba(235,18,18,1) 1%, rgba(31,33,210,1) 35%, rgba(117,50,222,1) 77%, rgba(40,179,230,1) 100%)",
        }}
      >
        <Toolbar>
          {isMatch ? (
            <React.Fragment>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>Shoppee</Typography>
              <DrawerComp pages={pages} />
            </React.Fragment>
          ) : (
            <Grid container={true} spacing={1} sx={{ placeItems: "center" }}>
              <Grid item={true} xs={2}>
                <Typography>
                  <ShoppingCartCheckout sx={{ transform: "scale(1.5)" }} />
                </Typography>
              </Grid>
              <Grid item={true} xs={6}>
                <Tabs
                  sx={{ marginLeft: "auto" }}
                  indicatorColor="secondary"
                  textColor="inherit"
                  value={value}
                  onChange={(_e, value) => setValue(value)}
                >
                  {pages.map((page, index) => (
                    <Tab label={page} key={index} />
                  ))}
                </Tabs>
              </Grid>
              {/* //* Empty Grid */}
              <Grid item={true} xs={2}></Grid>
              <Grid item={true} xs={2}>
                <Box>
                  <ButtonGroup sx={{ marginLeft: "auto" }}>
                    <Button variant="contained">Login</Button>
                    <Button variant="contained" color="error">
                      SignUp
                    </Button>
                  </ButtonGroup>
                </Box>
              </Grid>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
