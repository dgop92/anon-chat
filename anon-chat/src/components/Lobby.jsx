import React, { useState } from "react";
import { Box, TextField, Typography, Paper } from "@mui/material";
import PrimaryButton from "./base/PrimaryButton";

export default function Lobby({ goToChatRoom }) {
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    goToChatRoom(name);
    event.preventDefault();
  };

  return (
    <Box elevation={1} m={2} p={3} sx={{ maxWidth: 800 }} component={Paper}>
      <Typography sx={{ fontWeight: 700 }} mb={2} variant="h4" component="h4">
        Anon Chat
      </Typography>
      <Typography mb={2} variant="body1" component="p">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ratione
        sapiente qui, voluptas totam a molestias est. Quisquam, aut. Cupiditate
        eaque atque culpa ex maiores?
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          id="chatName"
          label="Nombre"
          variant="outlined"
          size="small"
          value={name}
          onChange={handleNameChange}
          inputProps={{
            required: true,
            minLength: 2,
            maxLength: 25,
            pattern: "\\w+",
          }}
          helperText="Only characters and digits are allowed"
        />
        <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <PrimaryButton type="submit" variant="contained">
            Join
          </PrimaryButton>
        </Box>
      </form>
    </Box>
  );
}
