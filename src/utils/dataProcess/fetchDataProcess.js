import { fetcherGet } from 'core/fetchData/fetchData';
export const getUrlBPMNByProcessName = (selected) => {
	switch (selected) {
		case 'CasUtilisationPOC':
			return 'https://raw.githubusercontent.com/Stage2022/Protools-Flowable/main/src/main/resources/processes/casUsageTest.bpmn20.xml';
		default:
			console.log('Error: BPMN file not found');
			return 'https://raw.githubusercontent.com/bpmn-io/bpmn-js-examples/master/modeler/resources/newDiagram.bpmn';
	}
};

// Retrieve all available task of the current process
export const getAvailableTasks = (processInstanceId) => {
	const urlEndpoint = 'tasksProcessID/';
	const apiUrl =
		process.env.REACT_APP_API_URL + urlEndpoint + processInstanceId;
	const dataUrl = [];
	const listName = [];
	fetcherGet(apiUrl)
		.then((r) => {
			const datatmp = r.data;
			for (let i = 0; i < datatmp.length; i++) {
				dataUrl.push({
					id: datatmp[i].id,
					name: datatmp[i].name,
					processInstance: datatmp[i].processInstance,
					createTime: datatmp[i].createTime,
					processDefinitionID: datatmp[i].processDefinitionID,
				});
				listName.push(datatmp[i].name);
			}
		})
		.catch((e) => {
			console.log('error', e);
		});
	return [dataUrl, listName];
};

// Retrieve processDefinition ID from Process Instance ID
export const getProcessDefinitionID = async (id) => {
	const urlEndpoint = 'processDefinition/';
	const apiUrl = process.env.REACT_APP_API_URL + urlEndpoint + id;
	fetcherGet(apiUrl)
		.then((r) => {
			return r.data;
		})
		.catch((e) => {
			console.log('error', e);
		});
	//console.log('ProcessDefinitionId', result);
};

// Retrieve the id of a task from task name
export const getCorrespondingBpmnElement = (BpmnResponse, liste) => {
	const obj = Object.entries(BpmnResponse).reduce(
		(acc, [key, val]) =>
			liste.filter((name) => name === val.name).length > 0
				? { ...acc, key }
				: { ...acc },

		{}
	);
	console.log('obj: ', obj);
	return obj;
};

// Retrieve all BPMN elements from a processDefinitionID
export const getBPMNInfo = (id, listName) => {
	const urlEndpoint = 'bpmnInfo/';
	const apiUrl = process.env.REACT_APP_API_URL + urlEndpoint + id;
	let response = {};
	fetcherGet(apiUrl)
		.then((r) => {
			response = getCorrespondingBpmnElement(r.data, listName);
			console.log('getBPMNInfo: ', response);
			return response;
		})
		.catch((e) => {
			console.log('error', e);
		});
};

export const getCurrentActivityName = (id) => {
	// List of available tasks
	const listName = getAvailableTasks(id)[1];

	// Fetch processDefinitionID
	const urlEndpoint = 'processDefinition/';
	const apiUrl = process.env.REACT_APP_API_URL + urlEndpoint + id;

	const RAAAAAAAH = fetcherGet(apiUrl)
		.then((r) => {
			const urlEndpointBPMN = 'bpmnInfo/';
			const apiUrlBPMN =
				process.env.REACT_APP_API_URL + urlEndpointBPMN + r.data;
			// Fetch all BPMN element of the process using processDefinitionID
			const correspondingElements = fetcherGet(apiUrlBPMN)
				.then((r) => {
					const response = getCorrespondingBpmnElement(r.data, listName);
					console.log('getBPMNInfo: ', response);
					return response;
				})
				.catch((e) => {
					console.log('error', e);
				});
			return correspondingElements.then((r) => {
				console.log('correspondingElements Value: ', r);
				return r;
			});
		})
		.catch((e) => {
			console.log('error', e);
		});
	return RAAAAAAAH;
};