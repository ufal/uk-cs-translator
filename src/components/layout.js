import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
	Typography,
	AppBar,
	Toolbar,
	IconButton,
	Button,
	Tooltip,
	Dialog,
	Snackbar,
	DialogTitle,
	DialogActions,
} from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import AboutUs from "./about-us";

import styles from "./layout.module.scss"


function Layout({ children }) {
	const [collectionSnackbar, setCollectionSnackbar] = useState(true);
	const [openAboutUs, setOpenAboutUs] = useState(false);
	const [forOrganizations, setForOrganizations] = useState(false);

	useEffect(() => setCollectionSnackbar(localStorage.getItem("collectDataConsentValue") !== "true"),[])
	useEffect(() => setForOrganizations((localStorage.getItem("organizationName") || "").length !== 0))

	const allowCollection = () => { 
		setCollectionSnackbar(false);
		if(typeof window !== 'undefined')
			window.localStorage.setItem("collectDataConsentValue", "true");
	}

	return (
		<>
			<CssBaseline />
			<div className={styles.container}>
				<AppBar
					position="static"
					sx={{
						bgcolor: "#2196f3",
						"& .MuiToolbar-root": { padding: "4px 0 4px 12px" },
					}}
					elevation={0}
				>
					<Toolbar sx={{ padding: 2 }}>
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1, ml: 1 }}
							color="white"
						>
							<div className={styles.flagsContainer}>
								<img
									src="/static/img/ukraine.png"
									className={styles.flagIcon}
								/>
								<img
									src="/static/img/czech-republic.png"
									className={styles.flagIcon}
								/>
								<p>ÚFAL Translator {forOrganizations && "for organizations"}</p>
							</div>
						</Typography>
						<Tooltip title="About us">
							<IconButton
								size="small"
								edge="start"
								aria-label="menu"
								sx={{ mr: 1, color: "white" }}
								onClick={() => setOpenAboutUs(true)}
							>
								<InfoIcon />
							</IconButton>
						</Tooltip>
					</Toolbar>
				</AppBar>

				{children}

				<Dialog
					PaperProps = {{
						sx:{maxWidth: "800px"}
					}}
					open={openAboutUs}
					onClose={()=>setOpenAboutUs(false)}
				>
					<DialogTitle>
						<IconButton
							sx={{
								position: 'absolute',
								right: 8,
								top: 8,
								color: (theme) => theme.palette.grey[500],
							}}
							onClick={()=>setOpenAboutUs(false)}
						>
							<CloseIcon />
						</IconButton>
					</DialogTitle>
					<AboutUs/>
					<DialogActions>
						<Button onClick={()=>setOpenAboutUs(false)}>Close</Button>
					</DialogActions>
				</Dialog>

				<Snackbar
					open={collectionSnackbar}
					message={`Souhlasím s tím, aby Ústav formální a aplikované lingvistiky
						MFF UK ukládal vstupy a výstupy z překladače. V případě souhlasu,
						mohou být anonymizované texty využity pro další vývoj systému.`}
					anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
					action={(
						<React.Fragment>
							<Button size="large" onClick={allowCollection}>
								<CheckIcon fontSize="small" />
								SOUHLASÍM
							</Button>
							<Button size="large" onClick={() => setCollectionSnackbar(false)}>
								<CloseIcon fontSize="small" />
								NESOUHLASÍM
							</Button>
						</React.Fragment>
					)}
				/>

				<div className={styles.footer}>
					THE LINDAT/CLARIAH-CZ PROJECT (LM2018101; formerly
					LM2010013, LM2015071) IS FULLY SUPPORTED BY THE MINISTRY OF
					EDUCATION, SPORTS AND YOUTH OF THE CZECH REPUBLIC UNDER THE
					PROGRAMME LM OF LARGE INFRASTRUCTURES
				</div>
			</div>
		</>
	);
}

export default Layout;
