const cap1st = string => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

const verCompare = (cloud, local, dbName) => {
	if (dbName === undefined) {
		return [
			`Something went really wrong with version compare`,
			`The dbName was undefined.`,
			`Cannot continue...`,
			'f'
		];
	}

	const compare = (v1, v2) => {
		const set1 = v1.split('.');
		const set2 = v2.split('.');
		if (Number(set1[0]) > Number(set2[0])) return -1;
		if (Number(set1[0]) < Number(set2[0])) return 1;
		if (Number(set1[1]) > Number(set2[1])) return -1;
		if (Number(set1[1]) < Number(set2[1])) return 1;
		if (Number(set1[2]) > Number(set2[2])) return -1;
		if (Number(set1[2]) < Number(set2[2])) return 1;
		return 0;
	};
	const compared = compare(cloud, local);

	if (compared < 0) {
		return [
			`Database Version Correct: ${Boolean(false)}`,
			`Current DB '${dbName}' version is newer than` +
				` the Cloud version.`,
			`Mismatch versions can result in game crashes or errors.`,
			'w'
		];
	} else if (compared > 0) {
		return [
			`Database Version Correct: ${Boolean(false)}`,
			`There is a newer version of the DB ` + `'${dbName}' in the Cloud.`,
			`Mismatch versions can result in game crashes or errors.`,
			'w'
		];
	} else {
		return [`Database Version Correct: ${Boolean(true)}`, ``, ``, `i`];
	}
};

module.exports = { cap1st, verCompare };
