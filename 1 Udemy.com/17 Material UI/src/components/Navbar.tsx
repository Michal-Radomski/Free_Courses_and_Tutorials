import React from "react";
import { AppBar, Button, Tab, Tabs, Theme, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";

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
      <AppBar sx={{ background: "cyan" }}>
        <Toolbar>
          <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} />
          {isMatch ? (
            <React.Fragment>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>Shoppee</Typography>
              <DrawerComp pages={pages} />
            </React.Fragment>
          ) : (
            <React.Fragment>
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
              <Button sx={{ marginLeft: "auto" }} variant="contained">
                Login
              </Button>
              <Button sx={{ marginLeft: "10px" }} variant="contained" color="error">
                SignUp
              </Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
