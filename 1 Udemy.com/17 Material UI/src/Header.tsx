import React from "react";
import { AppBar, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";

import DrawerComp from "./DrawerComp";

const Header = (): JSX.Element => {
  const theme = useTheme();
  console.log("theme:", theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log({ isMatch });

  const [value, setValue] = React.useState<number>(0);

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} />
          {isMatch ? (
            <React.Fragment>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>Shoppee</Typography>
              <DrawerComp />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab label="Products" />
                <Tab label="Services" />
                <Tab label="About Us" />
                <Tab label="Contact" />
              </Tabs>
              <Button sx={{ marginLeft: "auto" }} variant="contained">
                Login
              </Button>
              <Button sx={{ marginLeft: "10px" }} variant="contained">
                SignUp
              </Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
