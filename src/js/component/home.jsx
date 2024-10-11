import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => { 
	const [todo, setTodo]= useState("");
	const [todos, setTodos]= useState([]);

	const deleteTodo = (indexToDelete) => {
		setTodos(todos.filter((_, index) => index !== indexToDelete));
	}; 

	return (
		<div className="text-center container mt-5">

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
					<li key = {index} className= "form-control d-flex justify-content-between align-items-center">{task}
					<button className="btn btn-danger btn-sm ml-2"
					onClick={() => deleteTodo(index)}
					>
                     				 				 
					 x
					</button>
					
					</li>

				))
				: <li> No task added</li>
				}
			</ul>
		</div>
	);
};

export default Home;
