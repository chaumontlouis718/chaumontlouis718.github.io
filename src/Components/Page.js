import { Box, Container, CssBaseline } from "@mui/material";
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
                <Container fixed sx={{ mt: 3, mb: 3, ml: "220px" }}>
                    {props.children}
                </Container>
            </Box>
        </Box>
    );
};

export default Page;
