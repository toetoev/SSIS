import { Button, Card, DatePicker, Form, Row, Select } from "antd";
import React, { useEffect, useState } from "react";

export default function OrderTrend() {
	const [dateRange, setDateRange] = useState([]);
	const [categories, setCategories] = useState([]);
	const [categoryOptions, setCategoryOptions] = useState([]);
	const { RangePicker } = DatePicker;
	const layout = {
		labelCol: { span: 3 },
		wrapperCol: { span: 16 },
	};
	const onValuesChange = (val) => {
		if (val.dateRange) setDateRange(val.dateRange);
		if (val.categories) setCategories(val.categories);
	};
	// TODO: call chart generator OrderController GetOrderTrend /startDate/endDate [categories]
	const onFinish = () => {
		console.log("Finish");
	};
	// TODO: get item categories set to select
	useEffect(() => {}, []);
	return (
		<>
			<Row style={{ width: "100%" }}>
				<Card bordered={false} style={{ width: "100%" }}>
					<Form layout="inline" onFinish={onFinish} onValuesChange={onValuesChange}>
						<Form.Item label="Week Range" name="dateRange">
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
				<Card bordered={false} style={{ width: "50%" }}></Card>
				<Card bordered={false} style={{ width: "50%" }}></Card>
			</Row>
		</>
	);
}
