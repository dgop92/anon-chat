import React, { useState } from "react";
import Box from "@mui/material/Box";
import { TextField, Typography, Paper } from "@mui/material";
import PrimaryButton from "./base/PrimaryButton";

const BACKGROUND_IMAGE_URL =
  "https://source.unsplash.com/CdBPMI26KDo/1920x1280";

export default function Lobby() {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        backgroundImage: `url("${BACKGROUND_IMAGE_URL}")`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <LobbyCard />
    </Box>
  );
}

function LobbyCard() {
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    console.log(name);
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
          }}
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
