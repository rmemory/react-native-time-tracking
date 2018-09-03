https://reactjs.org/docs/thinking-in-react.html

# Start With A Mock up of the UI.

It helps to have the JSON from the API. For example ...

[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

In this application we are not using an API.

# Step 1: Break The UI Into A Component Hierarchy

Components are the building blocks of any React Native application. Such as View, Text, Image, etc.

## Top level components

In this application, the top level app renders a title (using Text), and inside of a ScrollView, it renders a TogglableTimerForm and a list of EditableTimers.

## Second level components
The TogglableTimerForm determines whether to display a TimerButton (as a plus sign) or a TimerForm to create a new Timer. It makes this decision based on a isOpen boolean prop from the parent.

Each EditableTimer. The EditableTimer decides whether to display the Timer itself or the TimerForm where the Timer state can be edited. This decision is based on whether the parent passes an editFormOpen boolean prop.

## Third level components

The TimerForm component contains an input form to edit the title and project name of the timer. If the timer has an ID, it means it is an existing timer. If it doesn't have an ID, it means it is a new timer.

The TimerButton is simple a TouchableOpacity with Text to implement a button, and it allows the user to customize its UI.

The Timer itself simply displays the timer title, project name, and elapsed time. 

# Step 2: Build A Static Version in React

Create all of the components, do involve props, but don't involve state yet. 

# Step 3: Identify The Minimal (but complete) Representation Of UI State

* Is it passed in from a parent via props? If so, it probably isn’t state.

* Does it change over time? If not, it probably isn’t state.

* Can you compute it based on any other state or props in your component? If so, it’s not
state.

List of state
• The list of timers and properties of each timer
• Whether or not the edit form of a timer is open (editFormOpen)
• Whether or not the create form is open (isOpen)

# Step 4: Determine in which component each piece of state should live

For each piece of state in your application:

* Identify every component that renders something based on that state.
* Find a common owner component (a single component above all the components that need the state in the hierarchy).
* Either the common owner or another component higher up in the hierarchy should own the state.
* If you can’t find a component where it makes sense to own the state, create a new component simply for holding the state and add it somewhere in the hierarchy above the common owner component.

## The list of timers and attributes of each timer

The state for list of timer and timer properties belongs in App because that is where timers are created and where the list is displayed.

## Whether or not the edit form of a timer is open

This state could just live in each individual EditableTimer, which implies multiple timers can be edited at once. 

## Visibility of the create form

App doesn’t appear to care about whether ToggleableTimerForm is a button or TimerForm. Thus it feels safe to reason that the state can just live inside ToggleableTimerForm itself.

# Step 5: Hardcode initial states

# Step 6: Add inverse data flow

# Step 7: Add server communication

# Patterns

## General architecture

The top level app contains a title, a ToggleableTimerForm (which decides whether to show the "plus button" or TimerForm), a ScrollView (which contains the list of EditableTimers). The EditableTimer decides whether to display the Timer or the TimerForm. Lastly, there is the TimerButton which is used throughout.

## Benefits of Functional Stateless Components

Why would we want to use functional components? There are two main reasons:

First, using functional components where possible encourages developers to manage state in fewer locations. This makes our programs easier to reason about.

Second, using functional components are a great way to create reusable components. Because functional components need to have all their configuration passed from the outside, they are easy to reuse across apps or projects.

A good rule of thumb is to use functional components as much as possible.

## PropTypes

import PropTypes from 'prop-types';

TimerButton.propTypes = {
	color: ColorPropType.isRequired,
	title: PropTypes.string.isRequired,
	small: PropTypes.bool,
	onPress: PropTypes.func.isRequired,
};

TimerButton.defaultProps = {
	small: false,
};

or
class MyComponent {
	static propTypes = {
		id: PropTypes.string,
		title: PropTypes.string,
		project: PropTypes.string,
		onFormSubmit: PropTypes.func.isRequired,
		onFormClose: PropTypes.func.isRequired,
	};

	static defaultProps = {
		id: null,
		title: '',
		project: '',
	};

## TextInput fields for React Native
<View style={styles.textInputContainer}>
	<TextInput
		style={styles.textInput}
		underlineColorAndroid="transparent"
		defaultValue={title}
	/>

const styles = StyleSheet.create({
	textInputContainer: {
		borderColor: '#D6D7DA',
		borderRadius: 2,
		borderWidth: 1,
		marginBottom: 5,
	},
	textInput: {
		height: 30,
		padding: 5,
		fontSize: 12,
	},

## TouchableOpacity

export default function TimerButton({ color, title, small, onPress }) {
	return (
		<TouchableOpacity
			style={[styles.button, { borderColor: color }]}
			onPress={onPress}
		>
			<Text
				style={[
				styles.buttonText,
				small ? styles.small : styles.large,
				{ color },
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>

const styles = StyleSheet.create({
	button: {
		marginTop: 10,
		minWidth: 100,
		borderWidth: 2,
		borderRadius: 3,
	},
	small: {
		fontSize: 14,
		padding: 5,
	},
	large: {
		fontSize: 16,
		padding: 10,
	},
	buttonText: {
		textAlign: 'center',
		fontWeight: 'bold',
	},

## Pattern to update a list of objects in state, where only a portion of the properties in the object need to be updated

	state = {
		timers: [{
			title: 'Mow the lawn',
			project: 'House Chores',
			id: uuidv4(),
			elapsed: 5456099,
			isRunning: true,
		},
		{
			title: 'Bake squash',
			project: 'Kitchen Chores',
			id: uuidv4(),
			elapsed: 1273998,
			isRunning: false,
		},
		}]
	}

	const { timers } = this.state;
	
	this.setState({
		timers: timers.map(timer => {
			const { elapsed, isRunning } = timer;
			return {
				...timer,
				elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed,
			};
		}),
	});

## We can use map or other array operations to create JSX

{timers.map(({ title, project, id, elapsed, isRunning }) => (
	<EditableTimer
	key={id}
	id={id}
	title={title}
	project={project}
	elapsed={elapsed}
	isRunning={isRunning}
	/>
))}

## Ternary generation of JSX

return (
	<View style={[styles.container, !isOpen && styles.buttonPadding]}>
		{isOpen ? (
			<TimerForm />
		) : (
			<TimerButton title="+" color="black" onPress={this.handleFormOpen} />
		)}
	</View>
);

## In React Native, forms are stateful.

## Initialization of state based on props

constructor(props) {
	super(props);
	const { id, title, project } = props;

	this.state = {
		title: id ? title : '',
		project: id ? project : '',
	};
}

handleTitleChange = title => {
	this.setState({ title });
};

<TextInput
	style={styles.textInput}
	underlineColorAndroid="transparent"
	onChangeText={this.handleTitleChange}
	value={title}
/>