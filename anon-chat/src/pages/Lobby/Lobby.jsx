import React, { useState } from "react";
import { Box, TextField, Typography, Paper, LinearProgress } from "@mui/material";
import { PrimaryButton } from "../../components/Button";
import { useSocket } from "../../providers/SocketProvider";

export default function Lobby() {
  const [name, setName] = useState("");
  const { setUserNickname, loading, errorMessage } = useSocket();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setUserNickname(name);
  };

  return (
    <Box
      elevation={1}
      sx={{ width: "85vw", maxWidth: 800, m: 2, p: 3 }}
      component={Paper}
    >
      <Typography sx={{ fontWeight: 700, mb: 2 }} variant="h4" component="h4">
        Anon Chat
      </Typography>
      <Typography mb={2} variant="body1" component="p">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ratione
        sapiente qui, voluptas totam a molestias est. Quisquam, aut. Cupiditate eaque
        atque culpa ex maiores?
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
            maxLength: 10,
            pattern: "\\w+",
          }}
          error={!!errorMessage}
          helperText={errorMessage || "Only characters and digits are allowed"}
        />
        {loading ? (
          <LinearProgress sx={{ mt: 4 }} />
        ) : (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <PrimaryButton type="submit" variant="contained">
              Join
            </PrimaryButton>
          </Box>
        )}
      </form>
    </Box>
  );
}
