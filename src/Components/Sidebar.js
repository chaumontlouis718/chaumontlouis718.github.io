import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import { Avatar, ListItem } from "@mui/material";
import ListItemLink from "./ListItemLink";

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                "& .MuiDrawer-paper": { backgroundColor: "background.sidebar", width: "200px" },
            }}
            PaperProps={{ elevation: 5 }}
        >
            <List component="nav">
                <ListItem
                    sx={{
                        justifyContent: "center",
                    }}
                >
                    <Avatar alt="Mon avatar" src="astroneer.jpg" sx={{ width: 150, height: 150 }} />
                </ListItem>

                <ListItemLink to="/" primary="Home" icon={<HomeIcon />} />
                <ListItemLink to="/about" primary="About me" icon={<InfoIcon />} />
            </List>
        </Drawer>
    );
};

export default Sidebar;
