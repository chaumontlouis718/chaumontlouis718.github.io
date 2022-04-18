import { Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import "../styles/custom.scss";
import HelpIcon from "@material-ui/icons/Help";

const Sidebar = () => {
    return (
        <ProSidebar>
            <SidebarHeader>
                <NavLink to="/" style={{ textDecoration: "none" }}>
                    <h1 className="app-title">BRASIERS</h1>
                </NavLink>
            </SidebarHeader>
            <SidebarContent style={{ borderRight: "1px solid rgb(173,173,173,0.2)" }}>
                <Menu iconShape="circle">
                    <MenuItem>
                        WARRIOR
                        <NavLink to="/about"></NavLink>
                    </MenuItem>
                    <MenuItem>Component 2</MenuItem>
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                <Menu iconShape="circle">
                    <MenuItem icon={<HelpIcon />}>
                        ABOUT
                        <NavLink to="/about"></NavLink>
                    </MenuItem>
                </Menu>
            </SidebarFooter>
        </ProSidebar>
    );
};

export default Sidebar;
