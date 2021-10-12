import React from "react";
import Box from "@mui/material/Box";
import { TextField, Typography, Paper } from "@mui/material";
import PrimaryButton from "./base/PrimaryButton";

const BACKGROUND_IMAGE_URL = "https://source.unsplash.com/CdBPMI26KDo/1920x1280";

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
      <Box elevation={1} m={2} p={3} sx={{ maxWidth: 800 }} component={Paper}>
        <Typography sx={{ fontWeight: 700 }} mb={2} variant="h4" component="h4">
          Anon Chat
        </Typography>
        <Typography mb={2} variant="body1" component="p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
          ratione sapiente qui, voluptas totam a molestias est. Quisquam, aut.
          Cupiditate eaque atque culpa ex maiores?
        </Typography>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Nombre"
          variant="outlined"
          size="small"
        />
        <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <PrimaryButton variant="contained">Join</PrimaryButton>
        </Box>
      </Box>
    </Box>
  );
}
