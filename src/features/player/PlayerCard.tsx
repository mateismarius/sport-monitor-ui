import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { PlayerDto } from "../../app/models/playerDto";
import { getAge } from "../../helpers/player/playerHelper";
import { Link, useNavigate } from "react-router-dom";
import {IconButton, Stack, Tooltip} from "@mui/material";
import { Delete, AccountBox } from "@mui/icons-material";
import { useState } from "react";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import agent from "../../app/api/agent";
import {toast} from "react-toastify";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {HttpStatusCode} from "axios";
import PlayerListPage from "./PlayerListPage";

export default function PlayerCard(props: { player: PlayerDto}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
function onPageReload() {
  window.location.reload();
  }
function onRefresh() {
  setTimeout(onPageReload, 2500)
}

  const handleDeleteConfirmed = () => {
    if(props.player.id)
    {
      setLoading(true)
      agent.Players.delete(props.player.id)
          .then((response) => {
            if (response.statusCode === 204) {
              toast.success(`${props.player.playerName} a fost sters cu succes din baza de date`, {
                position: "top-center",
                autoClose: 2000,
              });
            }
          })
          .catch((error) => {
            toast.error("A aparut o eroare in timpul stergerii! Va rugam sa incercati mai tarziu", {
              position: "top-center",
              autoClose: 2000
            })
            console.log(error)
          })
          .finally(onRefresh)
    }
    setIsModalOpen(false);
  };
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };
  const navigate = useNavigate();

  const viewEvaluations = async (event: any) => {
    event.preventDefault();

    try {
      navigate("/evaluation/player", { state: { playerId: props.player.id } });
      console.log(props.player.id);
    } catch (error) {
      // handle rejected Promise/error/etc...
    }
  };



  return (
      <Card sx={{maxWidth: 300}}>
        <CardMedia
            component="img"
            alt="green iguana"
            height="auto"
            width="100%"
            image="/images/player.jpg"/>
        <CardContent>
          <Stack direction="row">
            <Typography gutterBottom variant="h5" component="div">
              {props.player.playerName}
            </Typography>
            <Stack
                direction="row"
                sx={{
                  float: "right",
                  marginLeft: "20%",
                  width: "30%",
                }}
            >
              <Tooltip title="Modifica" arrow>
                <IconButton >
                  <AccountBox color="primary" sx={{marginLeft: "5%"}}/>
                </IconButton>
              </Tooltip>
              <Tooltip title="Sterge" arrow>
                <IconButton onClick={handleDeleteClick}>
                  <Delete color="primary" sx={{marginLeft: "10%"}}/>
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Data nasterii: {props.player.dateOfBirth}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Data inceperii: {props.player.startDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Varsta: {getAge(props.player.dateOfBirth)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Inaltime: {props.player.actualHeight}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Greutate: {props.player.actualWeight}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/evaluation/player" onClick={viewEvaluations}>
            <Button variant="outlined" size="small">
              Teste
            </Button>
          </Link>
          <Button variant="outlined" size="small">
            Masuratori
          </Button>
          <Button variant="outlined" size="small">
            Meciuri
          </Button>
        </CardActions>
        <DeleteConfirmationModal isOpen={isModalOpen} onClose={handleModalClose} onDelete={handleDeleteConfirmed}/>
      </Card>

    
  );
}
