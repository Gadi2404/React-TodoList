import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import TasksList from './components/tasks-list';

export default class App extends Component {

	constructor(props){
		super(props);

		browserHistory.listen( location =>  {
			if( !this.didMount ){
				this.initialzeState();
				return;
			}
			this.filterList(location.pathname);
		});
	}

	initialzeState(){
		this.state = {
			listItems : [],
			allItems : [],
			currentList : [],
			listCount : 0,
			allChecked : false
		}
	}

	addToList(e){
		e.preventDefault();
		let target = e.currentTarget.childNodes[0];

		if( target.value.trim() ){
			let arr = this.state.allItems,
				unCheckedItems;

			arr.push( { value: target.value, status: false } );
			target.value = '';

			unCheckedItems = arr.filter( item => item.status === false ).length;

			this.setState({ allItems: arr, currentList: arr, listCount: unCheckedItems })
		}
	}

	removeFromList(e){
		let arr = this.state.allItems,
			index = +e.currentTarget.parentNode.getAttribute('data-index'),
			itemObj = arr[index],
			numOfItems = this.state.listCount,
			tasksLeft = itemObj.status? numOfItems : --numOfItems;

		arr.splice( index, 1 );

		this.setState({ allItems: arr, currentList: arr, listCount: tasksLeft})
	}

	handleCheckAll(){
		let arr = this.state.allItems,
			checkedBtn = this.state.allChecked,
			numOfUncheckedItems,
			checkedItems;

		checkedBtn = !checkedBtn;

		// check/uncheck all items
		arr.forEach(item => item.status = checkedBtn);

		numOfUncheckedItems = arr.filter( item => item.status === false ).length;

		this.setState({allItems: arr, currentList: arr, allChecked: checkedBtn, listCount: numOfUncheckedItems})
	}

	handleCheck(e){
		let arr = this.state.allItems,
			index = +e.currentTarget.parentNode.parentNode.getAttribute('data-index'),
			itemObj = arr[index],
			numOfItems = this.state.listCount,
			allBtnsChecked = this.state.allChecked,
			tasksLeft;

		itemObj.status = !itemObj.status;

		tasksLeft = itemObj.status? --numOfItems : ++numOfItems;

		allBtnsChecked = tasksLeft === 0? true : false;

		this.setState({allItems: arr, currentList: arr, listCount: tasksLeft, allChecked: allBtnsChecked})
	}

	filterList(currentRoute){
		let arr = this.state.allItems,
			currentList;

		if( currentRoute === '/active' )
			currentList = arr.filter( item => item.status === false )
		else if( currentRoute === '/completed' )
			currentList = arr.filter( item => item.status === true )
		else
			currentList = arr

		this.setState({ currentList: currentList })
	}

	componentDidMount(){
		this.didMount = true;
	}

	render(){
		return <div className="todoListContainer">
					<form className="todoInputWrap" onSubmit={this.addToList.bind(this)}>
						<input className="todoInput" placeholder="What needs to be done?" type="text" />
					</form>

					{this.state.allItems.length > 0? <TasksList that={this} /> : ''}
				</div>
	}

}