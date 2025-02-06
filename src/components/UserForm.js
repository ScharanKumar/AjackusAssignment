import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Paper, Typography, Box, Alert } from "@mui/material";

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ firstName: "", lastName: "", email: "", department: "" });
    const [error, setError] = useState(null);

    useEffect(() => {
        // Through this useEffect hook, the details of a user of specific id are fetched.
        if (id) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
                    const nameParts = response.data.name.split(" ");
                    setUser({
                        firstName: nameParts[0] || "",
                        lastName: nameParts[1] || "",
                        email: response.data.email,
                        department: `Department ${response.data.id}`
                    });
                    // Displaying user data in the console of the user whom data we are editing
                    console.log(`User data of id ${id}: `, response.data);
                }
                catch (error) {
                    setError("Error fetching user details.");
                }
            }
            fetchUserData();
        }
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = id ? `https://jsonplaceholder.typicode.com/users/${id}` : "https://jsonplaceholder.typicode.com/users";
        const method = id ? "put" : "post";
        try {
            const addOrEditUserBasedOnIdResponse = await axios[method](url, user);
            alert(id ? "User updated (simulated)" : "User added (simulated)");
            // Displaying addOrEditUserBasedOnIdResponse data in the console
            if (id){
                console.log("Edited data of user: ", addOrEditUserBasedOnIdResponse.data)
            }
            else{
                console.log("Added user data: ",addOrEditUserBasedOnIdResponse.data);
            }
            navigate("/");
        }
        catch (error) {
            setError("Error saving user.");
        }
    };

    return (
        <Paper sx={{ padding: 3, maxWidth: 500, margin: "auto", mt: 5 }}>
            <Typography variant="h5" gutterBottom>{id ? "Edit User" : "Add User"}</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField fullWidth margin="normal" label="First Name" value={user.firstName} onChange={e => setUser({ ...user, firstName: e.target.value })} required />
                <TextField fullWidth margin="normal" label="Last Name" value={user.lastName} onChange={e => setUser({ ...user, lastName: e.target.value })} required />
                <TextField fullWidth margin="normal" label="Email" type="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} required />
                <TextField fullWidth margin="normal" label="Department" value={user.department} onChange={e => setUser({ ...user, department: e.target.value })} required />

                <Box mt={2}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>{id ? "Update User" : "Add User"}</Button>
                </Box>
            </form>
        </Paper>
    );
};

export default UserForm;
