import { Box, Container, CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar";

const Page = (props) => {
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Sidebar></Sidebar>
            <Box
                component="main"
                sx={{
                    backgroundColor: "background.main",
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    {props.children}
                </Container>
            </Box>
        </Box>
    );
};

export default Page;
