import React, { useState, useEffect } from "react";

const TodoList = () => {
	let [task, setTask] = useState("");
	let [list, setList] = useState([]);
	let [inputText, setInput] = useState("");
	let [hoverState, setHover] = useState(undefined);
	let [cursor, setCursor] = useState("pointer");

	const getAllTodos = async function () {
		const options = {
			method: "GET",
			//body: JSON.stringify(null),
		};
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/unicorn",
			options
		);
		setList(await response.json());
	};

	useEffect(() => {
		//code goes here
		getAllTodos();
	}, []);

	const saveTodos = async (newTodos) => {
		const options = {
			method: "PUT",
			body: JSON.stringify(newTodos),
			headers: { "content-type": "application/json" },
		};
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/unicorn",
			options
		);
	};

	const handleInput = (pressedKey) => {
		if (pressedKey.keyCode == 13) {
			if (inputText.trim() === "") {
				alert("Sorry, add task please.");
				setInput("");
			} else {
				setTask(pressedKey.target.value);
				setList([...list, { label: task, done: false }]);
				setTask("");
				setInput("");
				saveTodos([...list, { label: task, done: false }]);
			}
		}
	};
	const changeCursor = () => {
		setCursor((prevState) => {
			if (prevState === "pointer") {
				return "default";
			}
			return "pointer";
		});
	};

	return (
		<div className="mainCont">
			<h1 className="fw-light title opacity-25">Your Todo List </h1>
			<div className="listDiv">
				<div className="inputBox">
					<input
						className="form-control"
						type="text"
						value={inputText}
						placeholder="To Do List"
						onKeyDown={(keyDown) => handleInput(keyDown)}
						onChange={(inputKeyPress) => {
							setTask(inputKeyPress.target.value);
							setInput(inputKeyPress.target.value);
						}}></input>
				</div>
				<div className="w-100 h-100">
					<ul className="list-group">
						{list.map((singleTask, i) => {
							return (
								<li
									onMouseEnter={() => setHover(i)}
									onMouseLeave={() => setHover(undefined)}
									className="list-group-item"
									key={i}>
									<div className="row">
										<div className="taskText col-10">
											{singleTask.label}
										</div>
										<div
											onMouseEnter={() => changeCursor}
											className="col-2">
											{i === hoverState ? (
												<i
													style={{ cursor: cursor }}
													onClick={() => {
														setList(
															list.filter(
																(item, p) =>
																	p !== i
															)
														);
														saveTodos(
															list.filter(
																(item, p) =>
																	p !== i
															)
														);
													}}
													className="fas fa-trash fa-lg col-2"></i>
											) : (
												""
											)}
										</div>
									</div>
								</li>
							);
						})}
						<li className="list-group-item">
							You have {list.length} tasks remaining!
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
export default TodoList;
