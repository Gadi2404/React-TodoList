import React from 'react';
import {Link} from 'react-router';

const TasksList = props => {
		let that = props.that;
		isActive = isActive.bind(that);
		return <div>
					<input id="checkAll" type="checkbox" hidden />
					<label className="checkAllBtn" htmlFor="checkAll" onClick={that.handleCheckAll.bind(that)}></label>
					<ul className="tasksList">
						{ that.state.currentList.map( eachListItem.bind(that) ) }
				   </ul>
				   <div className="listStatus">
				   		<span className="itemCount">{ that.state.listCount } tasks left</span>
				   		<nav className="viewStatusBtns">
				   			<Link to="/" className={isActive()}>all</Link>
				   			<Link to="/active" className={isActive('active')}>active</Link>
				   			<Link to="/completed" className={isActive('completed')}>completed</Link>
				   		</nav>
				   </div>
			   </div>
}

function eachListItem(item, i){
		return <li key={i} className="listItem" data-index={i}>
					<div className="checkboxWrap">
						<input className="itemCheckbox" checked={this.state.currentList[i].status} type="checkbox" onChange={this.handleCheck.bind(this)} />
						<label htmlFor="checkbox"></label>
					</div>
					<span className={ this.state.currentList[i].status? "listItemText complete" : "listItemText"}> { item.value } </span>
					<button className="removeBtn" onClick={this.removeFromList.bind(this)}>x</button>
			   </li>
}

function isActive(btnName = ''){
	let currentRoute = this.props.location.pathname,
		prefix = '/';
	return prefix + btnName === currentRoute? 'active' : '';
}

export default TasksList;
