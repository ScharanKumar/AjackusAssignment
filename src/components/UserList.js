import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Alert } from "@mui/material";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetching users on landing to this page.
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/users");
                setUsers(response.data)
            }
            catch (error) {
                setError("Failed to fetch users. Please try again.");
            }
        }
        fetchUsers();
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>User Management</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Button variant="contained" color="primary" >Add User</Button>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name.split(" ")[0]}</TableCell>
                                <TableCell>{user.name.split(" ")[1] || "N/A"}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.department || `Department ${user.id}`}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="warning" sx={{ mr: 1 }}>Edit</Button>
                                    <Button variant="contained" color="error" >Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserList;



