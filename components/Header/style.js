import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => (
    {
        root: {
            flexGrow: 1,
        },
        menuButton: {
            // marginRight: theme.spacing(1),
            marginRight: "15px",
            color: "white",
        },
        title: {
            marginLeft: "15px !important",
            fontSize: "1.38rem",
            color: "#fff",
            cursor: "pointer",
        },
        appBar: {
            backgroundColor: "white",
            color: "white",
        },
        toolbar: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        headerWrapper: {
            display: "flex",
            marginLeft: "5px",
            alignItems: "center",
        },
        header__wrapper__right: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: "5px",

        },
        icon: {
            marginRight: "15px",
            color: "#fff",
            cursor: "pointer",
        },
    }));