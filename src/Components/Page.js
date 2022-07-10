import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar";

const Page = (props) => {
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Box
                component="main"
                sx={{
                    backgroundColor: "background.main",
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <Sidebar></Sidebar>

                <Box
                    sx={{
                        ml: "220px",
                        mt: 3,
                        mb: 3,
                        pr: "50px",
                        pl: "50px",
                    }}
                >
                    {props.children}
                </Box>
            </Box>
        </Box>
    );
};

export default Page;
