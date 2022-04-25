import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import { Avatar, ListItem } from "@mui/material";
import ListItemLink from "./ListItemLink";
import ForestIcon from "@mui/icons-material/Forest";

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                "& .MuiDrawer-paper": { backgroundColor: "background.sidebar", width: "220px" },
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
                <ListItemLink to="/tents_and_trees" primary="Tents and trees" icon={<ForestIcon />} />
            </List>
        </Drawer>
    );
};

export default Sidebar;
