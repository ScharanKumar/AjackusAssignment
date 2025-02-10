import React from "react";
import { Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import { Box, Container } from "@mui/material";

const App = () => {
    return (
        <Box style={{
            backgroundColor: "#dfe7ea",
            minHeight: '100vh',
            maxWidth: '100vw', padding: '20px', boxSizing: "border-box"
        }}>
            <Container>
                <Routes>
                    {/* This route is used to display all the users,
                 also it has add, delete and edit buttons for user management. */}
                    <Route path="/" element={<UserList />} />

                    {/* This route is used to add a user. */}
                    <Route path="/add" element={<UserForm />} />

                    {/* This route is used to edit a user data. */}
                    <Route path="/edit/:id" element={<UserForm />} />
                </Routes>
            </Container>
        </Box>
    );
};

export default App;
