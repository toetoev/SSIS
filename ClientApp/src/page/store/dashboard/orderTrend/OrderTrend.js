import { Button, Card, DatePicker, Form, Row, Select } from "antd";
import React, { useState } from "react";

const OrderTrend = () => {
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
	// TODO: call chart generator
	const onFinish = () => {};
	// TODO: get item categories set to select
	useEffect(() => {}, []);
	return (
		<Row style={{ width: "100%" }}>
			<Card bordered={false} style={{ width: "100%" }}>
				<Form layout="inline" onFinish={onFinish} onValuesChange={onValuesChange}>
					<Form.Item label="Week Range" name="dateRange">
						<RangePicker picker="month" />
					</Form.Item>
					<Form.Item label="Item Category" name="categories">
						<Select
							mode="multiple"
							placeholder="Please select"
							options={categoryOptions}
						></Select>
					</Form.Item>
					<Form.Item>
						<Button type="primary">Generate Charts</Button>
					</Form.Item>
				</Form>
			</Card>
		</Row>
	);
};

export default OrderTrend;
