import React from 'react';

const TasksList = props => {
		let that = props.that;
		return <div>
					<input id="checkAll" type="checkbox" hidden />
					<label className="checkAllBtn" htmlFor="checkAll" onClick={that.handleCheckAll.bind(that)}></label>
					<ul className="tasksList">
						{ that.state.listItems.map( eachItem.bind(that) ) }
				   </ul>
				   <div className="listStatus">
				   		<span className="itemCount">{ that.state.listCount } tasks left</span>
				   		<div className="viewStatusBtns">
				   			<a href="" className="active">all</a>
				   			<a href="">active</a>
				   			<a href="">completed</a>
				   		</div>
				   </div>
			   </div>
}

function eachItem(item, i){
		return <li key={i} className="listItem" data-index={i}>
					<div className="checkboxWrap">
						<input className="itemCheckbox" checked={this.state.listItems[i].status} type="checkbox" onChange={this.handleCheck.bind(this)} />
						<label htmlFor="checkbox"></label>
					</div>
					<span className={ this.state.listItems[i].status? "listItemText complete" : "listItemText"}> { item.value } </span>
					<button className="removeBtn" onClick={this.removeFromList.bind(this)}>x</button>
			   </li>
}

export default TasksList;
