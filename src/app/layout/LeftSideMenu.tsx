import {useState} from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function LeftSideMenu() {
  const [openMeasurement, setOpenMeasurement] = useState(false);
  const [openPlayers, setOpenPlayers] = useState(false);
  const [openTests, setOpenTests] = useState(false);

  const handleClickMeasurement = () => {
    setOpenMeasurement(!openMeasurement);
  };

  const handleClickTest = () => {
    setOpenTests(!openTests);
  };

  const handleClickPlayers = () => {
    setOpenPlayers(!openPlayers);
  };

  const items = [
    {
      name: "Jucatori",
      buttonState: openPlayers,
      clickHandler: handleClickPlayers,
      submenu: [
        { name: "ViewPlayers", label: "Vizualizeaza", path: "/player/list" },
        { name: "AddUsers", label: "Adauga", path: "/player/new" },
      ],
    },
    {
      name: "Masuratori",
      buttonState: openMeasurement,
      clickHandler: handleClickMeasurement,
      submenu: [
        { name: "AddMeasurement", label: "Adauga", path: "/measurement/new" },
        { name: "AddChecking", label: "Adauga verificare", path: "/checking/new" },
      ],
    },
    {
      name: "Teste",
      buttonState: openTests,
      clickHandler: handleClickTest,
      submenu: [
        { name: "AddTest", label: "Adauga test", path: "/test/new" },
        { name: "AddEvaluation", label: "Adauga evaluare", path: "/evaluation/new" },
        { name: "EvaluationChartView", label: "Grafic rezultate", path: "/evaluation/player/view-chart"},
        { name: "EvaluationTableView", label: "Teste", path: "/test/list"},
      ],
    },
  ];
  return (
    <List
      sx={{ width: "100%", maxWidth: "12%", height: "100vh", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
        ></ListSubheader>
      }
    >
      {items.map((item) => (
        <>
          <ListItemButton key={item.name} onClick={item.clickHandler}>
            <ListItemText primary={item.name} />
            {item.buttonState ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={item.buttonState} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className="side-menu">
              {item.submenu.map((itm) => (
                <a href={itm.path} >
                  <ListItemButton key={itm.name} sx={{ pl: 4 }}>
                    <ListItemText primary={itm.label} key={itm.name} />
                  </ListItemButton>
                </a>
              ))}
            </List>
          </Collapse>
        </>
      ))}
    </List>
  );
}
