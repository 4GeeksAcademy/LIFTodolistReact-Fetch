import React, {useState} from "react";

//include images into your bundle


//create your first component
const Home = () => { 
	const [todo, setTodo]= useState("");
	const [todos, setTodos]= useState([]);

	const pendingItems = todos.length;

	const deleteTodo = (indexToDelete) => {
		setTodos(todos.filter((_, index) => index !== indexToDelete));
	}; 

	return (
		<div className="container min-vh-100 min-vw-75 m-5">
			 <fieldset>
			<legend class="text-center  text-secondary text-1">todos</legend>
			<div className="shett-1 bg-light min-vh-100 min-vw-50 shadow-lg pb-2 mb-2 bg-body">
			<div className="shett-2 bg-light min-vh-100 min-vw-50 shadow-lg pb-2 mb-2 bg-body">
			<div className="shett-3 bg-light min-vh-100 min-vw-50 shadow-lg pb-2 mb-2 bg-body">
	
		<div className="text-center  mt-5 shadow p-3 mb-5 bg-body bodyform">

			<input 
			className="form-control"  
			placeholder="What needs to be done" 
			value={todo}
			onChange={(e)=> setTodo(e.target.value)}

			onKeyDown={(e) => 
				e.code === "Enter" && todo.trim() !== ""
				?(setTodos([...todos, todo]),
					setTodo(""))
					:null
			
		}
			/>

			<ul>
				{todos.length >0
				?todos.map((task, index)=> (
					<li key = {index} 
					className= "list-group-item d-flex justify-content-between align-items-center task-item border-bottom">
						{task}
					<i 
					className="fas fa-solid fa-trash trash-icon"   
					onClick={() => deleteTodo(index)}
					>
					</i>
                     		 				 
					
					</li>

				))
				: <li className="form-control text-secondary"> No task added</li>
				}
			</ul>
		</div>
		</div>
		</div>
		</div>

		<h6 className="text-secondary">{`${pendingItems} pending ${pendingItems ===1 ? "item": "items"}`}</h6>
		</fieldset>
		</div>
		
	);
};

export default Home;
