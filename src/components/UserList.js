import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Alert } from "@mui/material";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetching users on landing to this page.
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/users");
                setUsers(response.data)
                // Through inspect we can see all the users data that are fetched.
                console.log("All users data: ", response.data)
            }
            catch (error) {
                setError("Failed to fetch users. Please try again.");
            }
        }
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {

        try {
            const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            // Through inspect we can the deletion response sent from the JSONPlaceholder after deleting a user.
            console.log("Response after deleting a user: ", response)
            setUsers(users.filter(user => user.id !== id));
            alert("User deleted (simulated)!");
        }
        catch (error) {
            setError("Error deleting user.");
        }
    };

    return (
        <Box >
            <Typography  variant="h4" gutterBottom>User Management Dashboard</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Button variant="contained" color="primary" component={Link} to="/add">Add User</Button>

            <TableContainer component={Paper} sx={{ mt: 2, boxSizing: 'border-box' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    backgroundColor: "green",
                                    color: "white",
                                    fontWeight: "600",
                                }}>
                                ID
                            </TableCell>
                            <TableCell
                                sx={{
                                    backgroundColor: "green",
                                    color: "white",
                                    fontWeight: "600",
                                }}>
                                First Name
                            </TableCell>
                            <TableCell
                                sx={{
                                    backgroundColor: "green",
                                    color: "white",
                                    fontWeight: "600",
                                }}>
                                Last Name
                            </TableCell>
                            <TableCell
                                sx={{
                                    backgroundColor: "green",
                                    color: "white",
                                    fontWeight: "600",
                                }}>
                                Email
                            </TableCell>
                            <TableCell
                                sx={{
                                    backgroundColor: "green",
                                    color: "white",
                                    fontWeight: "600",
                                }}>
                                Department
                            </TableCell>
                            <TableCell
                                sx={{
                                    backgroundColor: "green",
                                    color: "white",
                                    fontWeight: "600",
                                }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name.split(" ")[0]}</TableCell>
                                <TableCell>{user.name.split(" ")[1] || "N/A"}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                {/* If department is present then we can display directly. As we are not getting department data of the users
                                 from JSONPlaceholder, so i am assuming department in this manner.  */}
                                <TableCell>{user.department || `Department ${user.id}`}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="warning" component={Link} to={`/edit/${user.id}`} sx={{ m: 0.5 }}>Edit</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(user.id)} sx={{ m: 0.5 }}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserList;
