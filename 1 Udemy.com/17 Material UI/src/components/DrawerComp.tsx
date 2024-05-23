import React from "react";
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const DrawerComp = ({ pages }: { pages: string[] }): JSX.Element => {
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: { backgroundColor: "lightgray" },
        }}
      >
        <List>
          {pages.map((page, index) => (
            <ListItemButton key={index} divider={true} onClick={() => setOpenDrawer(false)}>
              <ListItemIcon>
                <ListItemText>{page}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton sx={{ color: "white", marginLeft: "auto" }} onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon color="inherit" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
