import React, { useEffect, useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useParams } from "react-router-dom";


import api from "../api";

function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const  {id} = useParams();

  async function fetchdata(event) {
    try {
        if (id) {
          const noteDate =  await api.get(`/${id}`)
          console.log(noteDate)
          setTitle(noteDate.data.data.title)
          setContent(noteDate.data.data.content )
      }
     } catch (error) {
        console.error("Error creating/editing note:", error);
      }
  }
      
  useEffect(() => {
    fetchdata()
   },[])
  

   
  
  async function handleSubmit(event) {
    event.preventDefault();

    const newNote = { title, content };
 
    try {
      if (id) {
       const update =  await api.patch(`/${id}`, newNote);
      } else {
        const create = await api.post("/", newNote);
      }
      window.location.href = "/";
        } catch (error) {
      console.error("Error creating/editing note:", error);
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container maxWidth="sm">
        <Typography variant="h4">Create/Edit Note</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <TextField
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: "16px" }}>
            Save
          </Button>
        </form>
      </Container>
    </Box>
  );
}

export default NoteForm;