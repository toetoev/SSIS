import { Button, Card, DatePicker, Form, Row, Select } from "antd";
import React, { useEffect, useState } from "react";

import ReactEcharts from "echarts-for-react";
import axios from "axios";

export default function OrderTrend() {
	const [dateRange, setDateRange] = useState([]);
	const [categories, setCategories] = useState([]);
	const [categoryOptions, setCategoryOptions] = useState([]);
	const [monthlyTotalQty, setMonthlyTotalQty] = useState([]);
	const { RangePicker } = DatePicker;
	const [orderData, setOrderData] = useState([]);
	const layout = {
		labelCol: { span: 3 },
		wrapperCol: { span: 16 },
	};
	const dateFormat = "yyyy-MM-DD";
	const onValuesChange = (val) => {
		if (val.dateRange) setDateRange(val.dateRange.map((val) => val.format(dateFormat)));
		if (val.categories) setCategories(val.categories);
		if (val.monthlyTotalQty) setMonthlyTotalQty(val.monthlyTotalQty);
	};

	// const showCategories = () => {
	// 	return (
	// 		"[ " +
	// 		categories.forEach((element) => {
	// 			"{ name: " +
	// 				categories[element] +
	// 				', type: "line", stack: "Total", data: ' +
	// 				[1, 2, 3] +
	// 				"} ,";
	// 		}) +
	// 		"]"
	// 	);
	// };

	// TODO: call chart generator OrderController GetOrderTrend /startDate/endDate [categories]
	const onFinish = () => {
		axios
			.post(`https://localhost:5001/api/order/${dateRange[0]}/${dateRange[1]}`, categories, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
					"Content-type": "application/json",
				},
			})
			.then((res) => {
				const result = res.data;
				console.log(result);
				if (result.success) {
					setCategoryOptions(
						result.data.reduce((options, categories) => {
							return [...options, { label: categories.name, value: categories.name }];
						}, [])
					);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/category", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setCategoryOptions(
						result.data.reduce((options, category) => {
							return [...options, { label: category.name, value: category.name }];
						}, [])
					);
					setMonthlyTotalQty(
						result.data.reduce((options, monthlyTotalQty) => {
							return [
								...options,
								{
									label: monthlyTotalQty,
									value: monthlyTotalQty,
								},
							];
						})
					);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	const totalDateRange = (dateRange) => {
		var fromYear = new Date(dateRange[0]).getFullYear();
		var fromMonth = new Date(dateRange[0]).getMonth();
		var toYear = new Date(dateRange[1]).getFullYear();
		var toMonth = new Date(dateRange[1]).getMonth();
		var months = [];
		for (let year = fromYear; year <= toYear; year++) {
			let month = year === fromYear ? fromMonth : 0;
			const monthLimit = year === toYear ? toMonth : 11;
			for (; month <= monthLimit; month++) {
				months.push({ year, month });
			}
		}

		// var dateStart = dateRange[0];
		// var dateEnd = dateRange[1];
		// var timeValues = [];

		// while (dateEnd > dateStart || dateStart.format("M") === dateEnd.format("M")) {
		// 	timeValues.push(dateStart.format("YYYY-MM"));
		// 	dateStart.add(1, "month");
		// }
		// console.log(timeValues);

		// var startDate = dateRange[0];
		// var endDate = dateRange[1];
		// var start = new Date(startDate);
		// var end = new Date(endDate);
		// var dates = [];
		// for (var i = start.getFullYear(); i < end.getFullYear() + 1; i++) {
		// 	dates.push(i + "-" + "-01");
		// }
		console.log(months);

		// for (var i = start.getFullYear(); i < end.getFullYear() + 1; i++) {
		// 	for (var j = 1; j <= 12; j++) {
		// 		if (i === end.getFullYear() && j === end.getMonth() + 3) {
		// 			break;
		// 		} else if (i === 2012 && j < 4) {
		// 			continue;
		// 		} else if (j < 10) {
		// 			var dateString = [i, "-", "0" + j, "-", "01"].join("");
		// 			dates.push(dateString);
		// 		} else {
		// 			var dateString = [i, "-", j, "-", "01"].join("");
		// 			dates.push(dateString);
		// 		}
		// 	}
		// 	console.log(dates);
	};

	// const lineGraphCategories = (categories, monthlyTotalQty) => {
	// 	console.log(
	// 		"[ " +
	// 			categories.forEach((element) => {
	// 				"{ name: " +
	// 					categories[element] +
	// 					', type: "line", stack: "Total", data: ' +
	// 					monthlyTotalQty[element] +
	// 					"} ,";
	// 			}) +
	// 			"]"
	// 	);
	// };

	return (
		<>
			<Row>
				<Card bordered={false} style={{ width: "100%" }}>
					<Form layout="inline" onFinish={onFinish} onValuesChange={onValuesChange}>
						<Form.Item label="Month Range" name="dateRange">
							<RangePicker picker="month" />
						</Form.Item>
						<Form.Item label="Item Category" name="categories">
							<Select
								mode="multiple"
								style={{ width: "300px" }}
								placeholder="Please select"
								options={categoryOptions}
							></Select>
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								Generate Charts
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</Row>
			<Row>
				<Card bordered={false} style={{ width: "50%" }}>
					<ReactEcharts
						option={{
							title: {
								text: "Order Trends",
							},
							tooltip: {
								trigger: "axis",
							},
							legend: {
								data: categories,
							},
							grid: {
								left: "3%",
								right: "4%",
								bottom: "3%",
								containLabel: true,
							},
							xAxis: {
								type: "category",
								boundaryGap: false,
								data: totalDateRange(dateRange),
								// data: dateRange,
							},
							yAxis: {
								type: "value",
							},
							series: [
								// lineGraphCategories(categories, monthlyTotalQty),
								{
									name: categories[0],
									type: "line",
									stack: "Total",
									data: [monthlyTotalQty[0]],
								},
								{
									name: categories[1],
									type: "line",
									stack: "Total",
									data: [monthlyTotalQty[1]],
								},
								{
									name: categories[2],
									type: "line",
									stack: "Total",
									data: [monthlyTotalQty[2]],
								},
								{
									name: categories[3],
									type: "line",
									stack: "Total",
									data: [monthlyTotalQty[3]],
								},
								{
									name: categories[4],
									type: "line",
									stack: "Total",
									data: [monthlyTotalQty[4]],
								},
								{
									name: categories[5],
									type: "line",
									stack: "Total",
									data: [monthlyTotalQty[5]],
								},
								{
									name: categories[6],
									type: "line",
									stack: "Total",
									data: [monthlyTotalQty[6]],
								},
								{
									name: categories[7],
									type: "line",
									stack: "Total",
									data: [monthlyTotalQty[7]],
								},
								{
									name: categories[8],
									type: "line",
									stack: "Total",
									data: [monthlyTotalQty[8]],
								},
								{
									name: categories[9],
									type: "line",
									stack: "Total",
									data: [monthlyTotalQty[9]],
								},
								{
									name: categories[10],
									type: "line",
									stack: "Total",
									data: [monthlyTotalQty[10]],
								},
								{
									name: categories[11],
									type: "line",
									stack: "Total",
									data: [monthlyTotalQty[11]],
								},
								{
									name: categories[12],
									type: "line",
									stack: "Total",
									data: [monthlyTotalQty[12]],
								},
								{
									name: categories[13],
									type: "line",
									stack: "Total",
									data: [monthlyTotalQty[13]],
								},
								{
									name: categories[14],
									type: "line",
									stack: "Total",
									data: [monthlyTotalQty[14]],
								},
								{
									name: categories[15],
									type: "line",
									stack: "Total",
									data: [monthlyTotalQty[15]],
								},
								{
									name: categories[16],
									type: "line",
									stack: "Total",
									data: [monthlyTotalQty[16]],
								},
								{
									name: categories[17],
									type: "line",
									stack: "Total",
									data: [monthlyTotalQty[17]],
								},

								// [
								// 	categories.forEach((element) => {
								// 		name: categories[element];
								// 		type: "line";
								// 		stack: "Total";
								// 		data: [element.data];
								// 	}),
							],
						}}
					/>
				</Card>
				<Card bordered={false} style={{ width: "50%" }}>
					<ReactEcharts
						option={{
							tooltip: {
								trigger: "item",
								formatter: "{a} <br/>{b}: {c} ({d}%)",
							},
							legend: {
								orient: "vertical",
								left: 10,
								data: categories,
							},
							series: [
								{
									name: "Pie Chart Heading",
									type: "pie",
									radius: ["50%", "70%"],
									avoidLabelOverlap: false,
									label: {
										show: false,
										position: "center",
									},
									emphasis: {
										label: {
											show: true,
											fontSize: "30",
											fontWeight: "bold",
										},
									},
									labelLine: {
										show: false,
									},
									data: [
										{ value: monthlyTotalQty[0], name: categories[0] },
										{ value: monthlyTotalQty[1], name: categories[1] },
										{ value: monthlyTotalQty[2], name: categories[2] },
										{ value: monthlyTotalQty[3], name: categories[3] },
										{ value: monthlyTotalQty[4], name: categories[4] },
										{ value: monthlyTotalQty[5], name: categories[5] },
										{ value: monthlyTotalQty[6], name: categories[6] },
										{ value: monthlyTotalQty[7], name: categories[7] },
										{ value: monthlyTotalQty[8], name: categories[8] },
										{ value: monthlyTotalQty[9], name: categories[9] },
										{ value: monthlyTotalQty[10], name: categories[10] },
										{ value: monthlyTotalQty[11], name: categories[11] },
										{ value: monthlyTotalQty[12], name: categories[12] },
										{ value: monthlyTotalQty[13], name: categories[13] },
										{ value: monthlyTotalQty[14], name: categories[14] },
										{ value: monthlyTotalQty[15], name: categories[15] },
										{ value: monthlyTotalQty[16], name: categories[16] },
										{ value: monthlyTotalQty[17], name: categories[17] },
									],
								},
							],
						}}
					/>
				</Card>
			</Row>
		</>
	);
}
