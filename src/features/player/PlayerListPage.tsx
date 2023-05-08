import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Container } from "@mui/system";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { PlayerDto } from "../../app/models/playerDto";
import PlayerCard from "./PlayerCard";

export default function PlayerListPage() {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState<PlayerDto[]>([]);

    useEffect(() => {
    agent.Players.list()
      .then((response) => {
        const playerUI: PlayerDto[] = [];
        const playerBnd: PlayerDto[] = response;
        let crt: number = 1;
        playerBnd.forEach((element) => {
          const player: PlayerDto = {
            crt: crt,
            id: element.id,
            playerName: element.playerName,
            genre: element.genre,
            dateOfBirth:
              element.dateOfBirth !== null
                ? new Date(element.dateOfBirth).toLocaleDateString("ro-RO")
                : "",
            startDate:
              element.startDate !== null
                ? new Date(element.startDate).toLocaleDateString("ro-RO")
                : "",
            badgeNo: element.badgeNo,
            isActive: element.isActive ? "Activ" : "Inactiv",
            actualHeight: element.actualHeight,
            actualWeight: element.actualWeight,
          };
          playerUI.push(player);
          crt++;
        });
        setPlayers(playerUI);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent />;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "80%",
        margin: 5,
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      </Container>

      <Grid container spacing={3}>
        {players.map((player) => {
          return (
            <Grid item xs={9} sm={6} lg={3} key={player.id} margin="2%">
              <PlayerCard player={player} />

            </Grid>
          );
        })}
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
