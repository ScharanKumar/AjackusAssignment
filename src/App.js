import React from "react";
import { Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import { Container } from "@mui/material";

const App = () => {
    return (
        <Container>
            <Routes>
                {/* This route is used to display all the users,
                 also it has add, delete and edit buttons for user management. */}
                <Route path="/" element={<UserList />} />
            </Routes>
        </Container>
    );
};

export default App;
