import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import api from "../api";

function NoteDetails({ match }) {
  const [note, setNote] = useState(null);

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await api.get(`/${match.params.id}`);
        setNote(response.data);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    }

    fetchNote();
  }, [match.params.id]);

  return (
    <Container>
      {note ? (
        <div>
          <Typography variant="h4">{note.title}</Typography>
          <Typography variant="body1">{note.content}</Typography>
        </div>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </Container>
  );
}

export default NoteDetails;