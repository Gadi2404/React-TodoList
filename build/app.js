import React, { Component } from 'react';
import TasksList from './components/tasks-list';

export default class App extends Component {

	constructor(props){
		super(props);

		this.state = {
			listItems : [],
			listCount : 0,
			allChecked : false
		}
	}

	addToList(e){
		e.preventDefault();
		let target = e.currentTarget.childNodes[0];

		if( target.value.trim() ){
			let arr = this.state.listItems,
				unCheckedItems;

			arr.push( { value: target.value, status: false } );
			target.value = '';

			unCheckedItems = arr.filter( item => item.status === false ).length;

			this.setState({ listItems: arr, listCount: unCheckedItems })
		}
	}

	removeFromList(e){
		let arr = this.state.listItems,
			index = +e.currentTarget.parentNode.getAttribute('data-index'),
			itemObj = arr[index],
			numOfItems = this.state.listCount,
			tasksLeft = itemObj.status? numOfItems : --numOfItems;

		arr.splice( index, 1 );

		this.setState({ listItems: arr, listCount: tasksLeft})
	}

	handleCheckAll(){
		let arr = this.state.listItems,
			checkedBtn = this.state.allChecked,
			numOfUncheckedItems,
			checkedItems;

		checkedBtn = !checkedBtn;

		// check/uncheck all items
		arr.forEach(item => item.status = checkedBtn);

		numOfUncheckedItems = arr.filter( item => item.status === false ).length;

		this.setState({listItems: arr, allChecked: checkedBtn, listCount: numOfUncheckedItems})
	}

	handleCheck(e){
		let arr = this.state.listItems,
			index = +e.currentTarget.parentNode.parentNode.getAttribute('data-index'),
			itemObj = arr[index],
			numOfItems = this.state.listCount,
			allBtnsChecked = this.state.allChecked,
			tasksLeft;

		itemObj.status = !itemObj.status;

		tasksLeft = itemObj.status? --numOfItems : ++numOfItems;

		allBtnsChecked = tasksLeft === 0? true : false;

		this.setState({listItems: arr, listCount: tasksLeft, allChecked: allBtnsChecked})
	}

	renderInput(){
		return <form className="todoInputWrap" onSubmit={this.addToList.bind(this)}>
					<input className="todoInput" placeholder="What needs to be done?" type="text" />
				</form>
	}

	render(){
		return <div className="todoListContainer">
					{this.renderInput()}

					{this.state.listItems.length > 0? <TasksList that={this} /> : ''}
				</div>
	}

}