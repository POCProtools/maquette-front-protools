import React from 'react';
import { Grid, CardContent } from '@mui/material';
import CustomCard from '../../shared/styledComponents/card/card';
import { makeStyles } from 'tss-react/mui';
import {
	processChartdata,
	TaskChartdata,
	IncidentChartdata,
} from 'utils/mockData';
import DoughnutChart from './donutChart';

const useStyles = makeStyles()((theme) => {
	return {
		root: {
			body: {
				backgroundColor: theme.palette.background.default,
			},
		},
		card: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '75%',
			marginLeft: '22%',
			marginTop: '4%',
			//paddingLeft: '2%',
		},
		titleCard: {
			//marginLeft: 10,
			fontSize: 20,
			fontWeight: 'bold',
			color: theme.palette.primary.main,
		},
		gridItemProcessList: {
			textAlign: 'center',
		},
	};
});

const ProcessOverview = () => {
	const { classes } = useStyles();
	return (
		<CustomCard className={classes.card}>
			<CardContent>
				<Grid
					container
					spacing={10}
					justifyContent='space-between'
					alignItems='baseline'
				>
					<Grid item xs={4} className={classes.gridItemProcessList}>
						<span className={classes.titleCard}>Processus en cours</span>
						<DoughnutChart data={processChartdata} />
					</Grid>
					<Grid item xs={4} className={classes.gridItemProcessList}>
						<span className={classes.titleCard}>Tâches manuelles</span>
						<DoughnutChart data={TaskChartdata} />
					</Grid>
					<Grid item xs={4} className={classes.gridItemProcessList}>
						<span className={classes.titleCard}>Incidents en cours</span>
						<DoughnutChart data={IncidentChartdata} />
					</Grid>
				</Grid>
			</CardContent>
		</CustomCard>
	);
};

export default ProcessOverview;
