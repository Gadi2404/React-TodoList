import React from 'react';

const TasksList = (props)=> {
		var that = props.that;
		return <div>
					<input id="checkAll" type="checkbox" hidden />
					<label className="checkAllBtn" htmlFor="checkAll" onClick={that.handleCheckAll.bind(that)}></label>
					<ul className="tasksList">
						{ that.state.listItems.map( eachItem.bind(that) ) }
				   </ul>
				   <div className="listStatus">
				   		<span>{ that.state.listCount } tasks left</span>
				   </div>
			   </div>
}

function eachItem(item, i){
		return <li key={i} className="listItem">
					<div className="checkboxWrap">
						<input className="itemCheckbox" checked={this.state.checkeds[i]} type="checkbox" onChange={this.handleCheck.bind(this)} />
						<label htmlFor="checkbox"></label>
					</div>
					<span className={ this.state.checkeds[i]? "listItemText complete" : "listItemText"}> { item } </span>
					<button className="removeBtn" onClick={this.removeFromList.bind(this)}>x</button>
			   </li>
}

export default TasksList;
