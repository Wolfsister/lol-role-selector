import {Avatar} from "@mui/material";

interface Props {
    role: string;
}

export const RoleIcon = ({role}: Props) => {
  return (
      <Avatar sx={{padding: 0, width: "30px", height: "auto", maxHeight: "30px"}} alt={role} src={`/${role}_icon.png`} />
  );
}