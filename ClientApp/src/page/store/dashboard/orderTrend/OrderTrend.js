import { Button, Card, DatePicker, Form, Row, Select } from "antd";
import React, { useEffect, useState } from "react";

import ReactEcharts from "echarts-for-react";
import axios from "axios";

export default function OrderTrend() {
	const [dateRange, setDateRange] = useState([]);
	const [categories, setCategories] = useState([]);
	const [categoryOptions, setCategoryOptions] = useState([]);
	const { RangePicker } = DatePicker;
	const [orderData, setOrderData] = useState([]);
	const layout = {
		labelCol: { span: 3 },
		wrapperCol: { span: 16 },
	};
	const dateFormat = "yyyy-MM-DD HH:mm:ss";
	const onValuesChange = (val) => {
		if (val.dateRange) setDateRange(val.dateRange.map((val) => val.format(dateFormat)));
		if (val.categories) setCategories(val.categories);
	};

	const showCategories = () => {
		categories.forEach((element) => {
			return (
				"{ name: " +
				categories[element] +
				', type: "line", stack: "Total", data: ' +
				[1, 2, 3] +
				"} ,"
			);
		});
	};

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
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);
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
						// setSeries = showCategories();
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
							toolbox: {
								feature: {
									saveAsImage: {},
								},
							},
							xAxis: {
								type: "category",
								boundaryGap: false,
								data: ["Month1", "Month2", "Month3"],
							},
							yAxis: {
								type: "value",
							},
							series: [
								showCategories(),

								// {
								// 	name: categories[0],
								// 	type: "line",
								// 	stack: "Total",
								// 	data: [1, 2, 3],
								// },
								// {
								// 	name: categories[1],
								// 	type: "line",
								// 	stack: "Total",
								// 	data: [4, 5, 6],
								// },
								// {
								// 	name: categories[2],
								// 	type: "line",
								// 	stack: "Total",
								// 	data: [7, 8, 9],
								// },
								// {
								// 	name: categories[3],
								// 	type: "line",
								// 	stack: "Total",
								// 	data: [4, 2, 1],
								// },
								// {
								// 	name: categories[4],
								// 	type: "line",
								// 	stack: "Total",
								// 	data: [7, 9, 3],
								// },

								// {
								// 	for (i = 0; i<categories.length; i++) {
								// 		name: categories[i],
								// 		type: "line",
								// 		stack: "Total",
								// 		data: [1, 2, 3],
								// 	},
								// }

								// {
								// 	name: categories,
								// 	type: "line",
								// 	stack: "Total",
								// 	data: [1, 2, 3],
								// },

								// [
								// 	categories.forEach((element) => {
								// 		name: categories[element];
								// 		type: "line";
								// 		stack: "Total";
								// 		data: [element.data];
								// 	}),
								// ],
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
								data: ["Clips", "Trays", "Pens"],
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
										{ value: 335, name: "Clips" },
										{ value: 310, name: "Trays" },
										{ value: 234, name: "Pens" },
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
