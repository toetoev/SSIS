import { useEffect, useState } from "react";

import Fuse from "fuse.js";

const useSearch = ({ keyword, options }) => {
	const [dataSource, setDataSource] = useState([]);
	const [backupData, setBackupData] = useState([]);
	useEffect(() => {
		if (keyword === "") setDataSource(backupData);
		else {
			setBackupData(dataSource);
			const fuse = new Fuse(dataSource, options);
			const result = fuse.search(keyword);
			setDataSource(result.map((val) => val.item));
		}
	}, [keyword]);
	return [dataSource, setDataSource];
};

export default useSearch;
