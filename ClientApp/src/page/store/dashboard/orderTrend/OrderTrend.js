import { Button, Card, DatePicker, Form, Row, Select } from "antd";
import React, { useEffect, useState } from "react";

import Error from "../../../component/Error";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import moment from "moment";

export default function OrderTrend() {
	const { RangePicker } = DatePicker;
	const [dateRange, setDateRange] = useState([]);
	const [categories, setCategories] = useState([]);
	const [categoryOptions, setCategoryOptions] = useState([]);
	const [lineChartOption, setLineChartOption] = useState({});
	const [pieChartOption, setPieChartOption] = useState({});
	const dateFormat = "yyyy-MM-DD";
	const onValuesChange = (val) => {
		if (val.dateRange) setDateRange(val.dateRange);
		if (val.categories) setCategories(val.categories);
	};

	const onFinish = () => {
		axios
			.post(
				`https://localhost:5001/api/order/${dateRange[0].format(
					dateFormat
				)}/${dateRange[1].format(dateFormat)}`,
				categories,
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
						"Content-type": "application/json",
					},
				}
			)
			.then((res) => {
				const result = res.data;
				if (result.success) {
					if (result.data.length !== 0) {
						let xAxisData = [];
						for (
							let i = 0;
							i <=
							Math.floor(moment.duration(dateRange[1].diff(dateRange[0])).asMonths());
							i++
						) {
							xAxisData.push(dateRange[0].clone().add(i, "M").format("yyyy-MM"));
						}
						let lineChartData = [];
						result.data.forEach((el) => {
							lineChartData.push({
								name: el.category,
								type: "line",
								stack: "Total",
								data: el.monthlyTotalQty,
							});
						});
						setLineChartOption({
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
								data: xAxisData,
								name: "Month",
							},
							yAxis: {
								type: "value",
								name: "Ordered Qty",
							},
							series: lineChartData,
						});
						let pieChartData = [];
						result.data.forEach((el) => {
							pieChartData.push({
								name: el.category,
								value: el.monthlyTotalQty.reduce((acc, val) => acc + val, 0),
							});
						});
						setPieChartOption({
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
									name: "Total Qty",
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
									data: pieChartData,
								},
							],
						});
					}
				} else Error("Sorry, seems like we don't have records for the time range chosen");
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
								style={{ width: "350px" }}
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
			<br />
			<Row>
				<Card bordered={false} style={{ width: "50%" }}>
					<ReactEcharts option={lineChartOption} />
				</Card>
				<Card bordered={false} style={{ width: "50%" }}>
					<ReactEcharts option={pieChartOption} />
				</Card>
			</Row>
		</>
	);
}
