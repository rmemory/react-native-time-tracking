import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Timer from './Timer';
import TimerForm from './TimerForm';

export default class EditableTimer extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		project: PropTypes.string.isRequired,
		elapsed: PropTypes.number.isRequired,
		isRunning: PropTypes.bool.isRequired,
		onFormSubmit: PropTypes.func.isRequired,
		onRemovePress: PropTypes.func.isRequired,
		onStartPress: PropTypes.func.isRequired,
		onStopPress: PropTypes.func.isRequired,
		};

	state = {
		editFormOpen: false,
	}

	handleEditPress = () => {
		this.openForm();
	};
	
	handleFormClose = () => {
		this.closeForm();
	};
	
	handleSubmit = timer => {
		const { onFormSubmit } = this.props;
		onFormSubmit(timer);
		this.closeForm();
	};
	
	closeForm = () => {
		this.setState({ editFormOpen: false });
	};
		
	openForm = () => {
		this.setState({ editFormOpen: true });
	};

	render() {
		const { id, title, project, elapsed, isRunning, onRemovePress, onStartPress,
			onStopPress, } = this.props;
		const { editFormOpen } = this.state;

		return (
			<View>
			{/* Display a form to edit the timer */}
			{ editFormOpen 
				&& <TimerForm 
						id={id} 
						title={title} 
						project={project} 
						onFormSubmit={this.handleSubmit}
						onFormClose={this.handleFormClose}
					/>}
			
			{/* display the timer itself */}
			{ !editFormOpen 
				&& <Timer
						id={id}
						title={title}
						project={project}
						elapsed={elapsed}
						isRunning={isRunning}
						onEditPress={this.handleEditPress}
						onRemovePress={onRemovePress}
						onStartPress={onStartPress}
						onStopPress={onStopPress}
					/>}
		</View>
		);
	}
}
