import React, { useState } from 'react';
import {
	FormControl,
	Select,
	MenuItem,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	DialogContentText,
	Stack,
	Typography,
} from '@mui/material';
import { startProcess } from 'utils/dataProcess/processExecution';
import { useNavigate } from 'react-router-dom';

const SelectProcess = () => {
	const navigate = useNavigate();
	const [selected, setSelected] = useState('empty');
	const [selectedKey, setSelectedKey] = useState('IDK');
	const [open, setOpen] = useState(false);
	const [processParams, setProcessParams] = useState([]);

	const getUrl = (selected, callback) => {
		switch (selected) {
			case 'flowable':
				return 'CasUtilisationPOC';
			default:
				console.log('Error: BPMN file not found');
		}
		callback();
	};
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		navigate(
			'/process/' + processParams[0].processKey + '/' + processParams[0].id
		);
	};

	//const [url, setUrl] = useState(getUrl(selected));
	const handleChange = (event) => {
		console.log('event: ' + event.target.value);
		setSelected(event.target.value);
	};
	const handleChangeKey = (event) => {
		console.log('event: ' + event.target.value);
		setSelectedKey(event.target.value);
	};

	const navigationHandler = () => {
		console.log('Navigate to bpmn file');
		setProcessParams(startProcess(getUrl(selected), selectedKey));
		console.log('processParams: ' + processParams);
		handleClickOpen();
	};

	return (
		<>
			<FormControl size='small' fullWidth sx={{ marginTop: 3 }}>
				<Stack spacing={3}>
					<Typography variant='body1'> Processus :</Typography>
					<Select
						labelId='SelectBPMN'
						value={selected}
						label='Select BPMN'
						onChange={handleChange}
					>
						<MenuItem value={'flowable'}>Flowable POC</MenuItem>
					</Select>
					<Typography variant='body1'>Business Key :</Typography>
					<Select
						labelId='SelectBusinessKey'
						value={selectedKey}
						label='Select BusinessKey'
						onChange={handleChangeKey}
					>
						<MenuItem value={'TirageEnquête'}>Tirage Enquête</MenuItem>
						<MenuItem value={'TestPOC'}>TestPOC</MenuItem>
						<MenuItem value={'UnPandaRouxDors'}>Un Panda Roux Dors</MenuItem>
						<MenuItem value={'IDK'}>IDK</MenuItem>
					</Select>
					<Button onClick={navigationHandler}>Valider</Button>
				</Stack>
			</FormControl>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>{'Process Service'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Processus lancé avec succès, redirection vers la page de suivi du
						processus.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} autoFocus>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default SelectProcess;
