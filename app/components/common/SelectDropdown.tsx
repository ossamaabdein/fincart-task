const SelectDropdown = ({ value, setValue, options }: any) => {
	return (
		<select
			value={value}
			onChange={(e) => setValue(e.target.value)}
			className="border border-gray-300 rounded px-4 py-2 cursor-pointer"
		>
			<option value="all" className="text-black cursor-pointer">
				All Categories
			</option>
			{options?.map((option: string) => (
				<option
					key={option}
					value={option}
					className="text-black cursor-pointer"
				>
					{option}
				</option>
			))}
		</select>
	);
};

export default SelectDropdown;
