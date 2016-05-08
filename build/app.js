import React from 'react';

var App = React.createClass ({

	getInitialState(){
		return {
			listItems : [],
			listCount : 0,
			checkeds : [],
			checkAll : false
		}
	},

	addToList(e){
		if( e.keyCode === 13 && e.currentTarget.value.trim() !== ''){
			
			var arr = this.state.listItems,
				checkedArr = this.state.checkeds,
				checkedItems = checkedArr.filter(checked => checked === true).length;

			arr.push(  e.currentTarget.value );
			checkedArr.push( false );

			e.currentTarget.value = '';

			this.setState({ listItems: arr, listCount: arr.length - checkedItems, checkeds: checkedArr })
		}
	},

	removeFromList(e){		
		var arr = this.state.listItems,
			item = e.currentTarget.previousSibling,
			index = arr.indexOf( item.textContent.trim() ),
			checkedArr = this.state.checkeds,
			numOfItems = this.state.listCount,
			tasksLeft = checkedArr[index]? numOfItems : --numOfItems;

		arr.splice( index, 1 );
		checkedArr.splice( index, 1 )

		this.setState({ listItems: arr, checkeds: checkedArr, listCount: tasksLeft})
	},

	handleCheckAll(e){
		var arr = this.state.checkeds,
			checkedBtn = this.state.checkAll,
			numOfCheckedItems;

		checkedBtn = !checkedBtn;
		
		// check/uncheck all items
		var checkedItems = arr.map(item => item = checkedBtn )

		// count the number of checked items
		numOfCheckedItems = checkedItems.filter( item => item != true).length;

		this.setState({checkAll: checkedBtn ,checkeds: checkedItems, listCount: numOfCheckedItems})
	},

	handleCheck(e){
		var arr = this.state.listItems,
			item = e.currentTarget.nextSibling,
			index = arr.indexOf( item.textContent.trim() ),
			checkedArr = this.state.checkeds,
			numOfItems = this.state.listCount,
			tasksLeft,
			checkAllBtn = this.state.checkAll; 

		checkedArr[index] = !checkedArr[index];

		tasksLeft = checkedArr[index]? --numOfItems : ++numOfItems;

		if( tasksLeft === 0 )
			checkAllBtn = true;
		else if( tasksLeft === arr.length )
			checkedBtn = false;

		this.setState({checkeds: checkedArr, listCount: tasksLeft, checkAll: checkAllBtn})
	},	

	eachItem(item, i){
			return <li key={i} className="listItem">
						<input className="itemCheckbox" checked={this.state.checkeds[i]} type="checkbox" onChange={this.handleCheck} />
						<span className={ this.state.checkeds[i]? "listItemText complete" : "listItemText"}> { item } </span>
						<button className="removeBtn" onClick={this.removeFromList}>x</button>
				   </li>
	},

	renderInput(){
		return <div className="todoInputWrap">
					<input className="todoInput" placeholder="What needs to be done?" type="text" onKeyDown={this.addToList} />
				</div>			
	},

	renderList(){
		return <div>
					<input id="checkAll" type="checkbox" hidden />
					<label className="checkAllBtn" htmlFor="checkAll" onClick={this.handleCheckAll}>\/</label>
					<ul className="tasksList">
						{this.state.listItems.map(this.eachItem)}
				   </ul>
				   <div className="listStatus">
				   		<span>{ this.state.listCount } tasks left</span>
				   </div>
			   </div>
	},

	render(){
		return <div className="todoListContainer">
					{this.renderInput()}
					
					{this.state.listItems.length > 0? this.renderList() : ''}
				</div>	
	}
})

export default App;