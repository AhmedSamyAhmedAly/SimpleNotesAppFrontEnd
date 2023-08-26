import React, { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import api from "../api";

function NoteList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await api.get("/");
      setNotes(response.data.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/${id}`);
      fetchNotes(); // Fetch the updated notes after deletion
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Container>
        <Typography variant="h4">Notes</Typography>
        <Button variant="contained" color="primary" style={{ marginBottom: "16px" }}>
          <Link to="/create" style={{ color: "white", textDecoration: "none" }}>
            Create Note
          </Link>
        </Button>
        <Grid container spacing={2}>
          {notes.map((note) => (
            <Grid item key={note.id} xs={12} sm={6} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{note.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {note.content}
                  </Typography>
                  <Button variant="contained" color="primary" style={{ marginRight: "8px" }}>
                    <Link to={`/edit/${note._id}`} style={{ color: "white", textDecoration: "none" }}>
                      Edit
                    </Link>
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(note._id)}>
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default NoteList;