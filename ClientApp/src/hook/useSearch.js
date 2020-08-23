import Fuse from "fuse.js";
import { useEffect } from "react";
const useSearch = ({ keyword, options, dataSource, setDataSource, backupData, setBackupData }) => {
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
