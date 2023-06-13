import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//一个名字叫做Cell的方法并且接受了一个参数（props）
// eslint-disable-next-line react/prop-types
const Cell = function ({ onClick, text }) {
	/**
	 * props = {
	 *  onClick:()=>{
	 *      onClickCell(row,cel)
	 *  },
	 *  text:item
	 * }
	 */
	return (
		//返回一个名字叫做Cell的div 它的点击效果是获取的参数的点击效果
		<div className="Cell" onClick={onClick}>
			{text}
		</div>
	);
};
// 这是一个名字为Chessboard的函数组件
const Chessboard = function () {
	// 下方 Cells、n、f 为该组件内部状态
	const [Cells, setCells] = useState([
		[null, null, null],
		[null, null, null],
		[null, null, null],
	]);
	const [n, setN] = useState(0);
	const [f, setF] = useState(false);
	const onClickCZ = function () {
		setCells([
			[null, null, null],
			[null, null, null],
			[null, null, null],
		]);
	};
	// 这是一个名为onClickCell的方法，他接受两个参数，row，cel（形参）
	const onClickCell = (row, cel) => {
		console.log("行" + row);
		console.log("列" + cel);
		const copy = JSON.parse(JSON.stringify(Cells));
		if (copy[row][cel] == null && f == false) {
			copy[row][cel] = n % 2 == 0 ? "X" : "O";
			setCells(copy);
			console.log(Cells, "DI YI CI");
			setN(n + 1);
			for (let i = 0; i < 3; i++) {
				if (
					copy[i][0] == copy[i][1] &&
					copy[i][1] == copy[i][2] &&
					copy[i][0] !== null
				) {
					console.log("win" + copy[i][0]);
					setF(true);
				}
				break;
			}
			for (let i = 0; i < 3; i++) {
				if (
					copy[0][i] == copy[1][i] &&
					copy[1][i] == copy[2][i] &&
					copy[0][i] !== null
				) {
					console.log("win" + copy[0][i]);
					setF(true);
				}
				break;
			}
			if (
				copy[0][0] == copy[1][1] &&
				copy[1][1] == copy[2][2] &&
				copy[0][0] !== null
			) {
				console.log("win" + copy[0][0]);
				setF(true);
			}
			if (
				copy[0][2] == copy[1][1] &&
				copy[1][1] == copy[2][0] &&
				copy[0][2] !== null
			) {
				console.log("win" + copy[0][2]);
				setF(true);
			}
		}
	};
	return (
		// eslint-disable-next-line react/jsx-key
		<div>
			{/* 根据内部状态数据Cells渲染html元素 */}
			{Cells.map((items, row) => {
				return (
					// eslint-disable-next-line react/jsx-key
					<div className="row">
						{items.map((item, cel) => {
							// eslint-disable-next-line react/jsx-key
							return (
								// eslint-disable-next-line react/jsx-key
								<Cell
									// onClick，text为传递给函数组件Cell的props
									onClick={() => {
										// 调用方法onClickCell 并传递参数row，cel（实参）
										onClickCell(row, cel);
									}}
									text={item}
								/>
							);
						})}
					</div>
				);
			})}
			{f && (
				<div className="Bu">
					<div className="GM">GameOver</div>
					<div className="CZ" onClick={onClickCZ}>
						重置
					</div>
				</div>
			)}
		</div>
	);
};
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Chessboard />
	</React.StrictMode>
);
