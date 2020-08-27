import Fuse from "fuse.js";
import { useEffect, useState } from "react";

const useSearch = ({ keyword, options }) => {
	const [dataSource, setDataSource] = useState([]);
	const [backupData, setBackupData] = useState([]);
	useEffect(() => {
		if (keyword === "") setDataSource(backupData);
		else {
			setBackupData(dataSource);
			options.minMatchCharLength = 2;
			const fuse = new Fuse(dataSource, options);
			const result = fuse.search(keyword);
			setDataSource(result.map((val) => val.item));
		}
	}, [keyword]);
	return { dataSource, setDataSource };
};

export default useSearch;
