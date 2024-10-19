import React, {useState, useEffect} from "react";

//include images into your bundle


//create your first component
const Home = () => { 

	const [todo, setTodo]= useState("");

	const [todos, setTodos]= useState([]);

    const pendingItems = todos.length;

	//UseEffects
	//Consta de dos argumentos
	//1er Argumento, que es una función flecha
	//2 argumento (opciona) con tres posibilidades
	//   1er posibilidad -> [], va a ejecutar la función flecha uan sola vez. 
	//   2da posibilidad-> [<varible1>],[<varible1>],....] cad vez que alguna 
	//                     de las varaibles del arreglo cambie de valor
	//                     se ejecuta la función flecha
	//   3era posibildiad -> no poner nada, la función flecha se va a ejecutar siempre que 
	//                                  el compoenete se re-renderice
	 useEffect(()=>{
		getTodos();
		
	 },[]);

	//Logica de JS
	//fetch (url de la operación, métdo, body)
	//nota: Si no se aclara el método por defecto es siempre un GET
	
	
	function getTodos(){

		fetch("https://playground.4geeks.com/todo/users/nacho1$$")
	.then((resp)=>{
		console.log(resp);

		if (!resp.ok) throw new Error("Hay algo mal en el Get, revisar!");
		return resp.json();
	})
	// Se recibe los datos en formato JS
	.then((data)=>{
		console.log(data);
	setTodos(data.todos)
	})
	//Manejo de los errores 
	.catch((error)=>{
		return error;
	})
	}
	
	function postTodo(){
		let newTask ={
			label:todo,
			is_done : false
		}
		fetch("https://playground.4geeks.com/todo/todos/nacho1$$",{
			method: "POST",
			body: JSON.stringify(newTask),
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((resp)=>{
			if (!resp.ok) throw new Error("Error al agregar tarea");
			return resp.json();

		})
		.then((data)=>{
			console.log(data);
			getTodos();
			setTodo("");
		})
		.catch((err)=>{return err})

	}

	
//Aplica el método Delete para borrar las task.
	const deleteTodo = (id) => { 
		
		 
			fetch("https://playground.4geeks.com/todo/todos/" + id, {

			method: "DELETE",
			
			})
		
		.then((resp)=>{
			if (!resp.ok) throw new Error("Error al borrar tarea");
			
		// 	//return resp.json(); se comenta línea ya que el programa se quedaba esperando un devolución del Json que no llegaba nunca. 
			

		
		// //})
		// //.then((data) => {
		// 	console.log("Tarea Borrada", data);
			const updatedTodos = todos.filter((task) => task.id !== id);
			console.log("Actualizando lista local:", updatedTodos);
			setTodos(updatedTodos);
		})
		.catch((err)=>{
			console.log(err);
	});
};


	return (
		<div className="container min-vh-100 min-vw-75 m-5">
			 <fieldset>
			<legend className="text-center  text-secondary text-1">todos</legend>
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
				?postTodo()
					:null
			
		}
			/>

			<ul>
				{todos.length >0
				?todos.map((task, index)=> (
					<li key = {index} 
					className= "list-group-item d-flex justify-content-between align-items-center task-item border-bottom">
					{task.id}{task.label} 
					<i 
					className="fas fa-solid fa-trash trash-icon"   
					onClick={() =>  {
						return deleteTodo(task.id);
					}}
					>
					</i>
                     		 				 
					
					</li>

				))
				: <li className="form-control text-secondary">No task added. Add Task. </li>
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
