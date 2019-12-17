import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Parallax } from "react-parallax";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "./App.css";
import { Navigation, Form, ServiceList } from "./components";
import image1 from "./images/image1.png";
import image2 from "./images/image2.png";
import MomentUtils from "@date-io/moment";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import withSizes from "react-sizes";
import "typeface-raleway";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles({
	card: {
		maxWidth: 800
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	}
});

// const image1 =
//     'https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D';
// const image2 =
//     'https://img00.deviantart.net/2bd0/i/2009/276/c/9/magic_forrest_wallpaper_by_goergen.jpg';

const theme = createMuiTheme({
	typography: {
		fontFamily: "Raleway, sans-serif"
	},
	palette: {
		fontFamily: "Raleway, sans-serif"
	}
});
function App(props) {
	const classes = useStyles();
	const { isMobile } = props;
	return (
		<MuiThemeProvider theme={theme}>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<div className='App'>
					<Navigation />
					<div>
						<Parallax bgImage={image1} strength={200}>
							<Grid
								container
								spacing={0}
								direction='column'
								alignItems='center'
								justify='center'
								style={{ height: isMobile ? "170vh" : "70vh" }}>
								<Grid
									item
									xs={isMobile ? 11 : 8}
									style={{
										marginTop: isMobile ? "3em" : "-5em",
										minWidth: isMobile ? null : 600
									}}>
									<Card>
										<ServiceList isMobile={isMobile} />
									</Card>
								</Grid>
							</Grid>
						</Parallax>
						<p style={{ height: isMobile ? "0px" : "20px" }}></p>
						<Parallax bgImage={image2} strength={200}>
							<Grid
								container
								spacing={0}
								direction='column'
								alignItems='center'
								justify='center'
								style={{
									height: isMobile ? "255vh" : "155vh"
								}}>
								<Grid
									item
									xs={isMobile ? 11 : 6}
									style={{
										marginTop: isMobile ? "4em" : "-4em",
										minWidth: isMobile ? null : 600
									}}>
									<Card>
										<h1>Enquiry Form</h1>
										<Form isMobile={isMobile} />
									</Card>
								</Grid>
							</Grid>
						</Parallax>
					</div>
				</div>
			</MuiPickersUtilsProvider>
		</MuiThemeProvider>
	);
}
const mapSizesToProps = ({ width }) => ({
	isMobile: width < 600
});
export default withSizes(mapSizesToProps)(App);
