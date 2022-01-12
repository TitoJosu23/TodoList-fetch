import React, { useState } from "react";

const TodoList = () => {
	let [task, setTask] = useState("");
	let [list, setList] = useState([]);
	let [inputText, setInput] = useState("");
	let [hoverState, setHover] = useState(undefined);
	let [cursor, setCursor] = useState("pointer");

	const handleInput = (pressedKey) => {
		if (pressedKey.keyCode == 13) {
			if (inputText.trim() === "") {
				alert("Sorry, add task please.");
				setInput("");
			} else {
				setTask(pressedKey.target.value);
				setList([...list, task]);
				setTask("");
				setInput("");
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
			<h1 className="fw-light title opacity-25">Your Todo List</h1>
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
											{singleTask}
										</div>
										<div
											onMouseEnter={() => changeCursor}
											className="col-2">
											{i === hoverState ? (
												<i
													style={{ cursor: cursor }}
													onClick={() =>
														setList(
															list.filter(
																(item, p) =>
																	p !== i
															)
														)
													}
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
