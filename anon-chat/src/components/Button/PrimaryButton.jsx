import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const PrimaryButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

export default PrimaryButton;
