const SelectDropdown = ({ value, setValue, options }: any) => {
	console.log(options, "OPTIONS");
	
	return (
		<select
			value={value}
			onChange={(e) => setValue(e.target.value)}
			className="border border-gray-300 rounded px-4 py-2 cursor-pointer"
		>
			<option value="" className="text-black cursor-pointer">
				All Categories
			</option>
			{options?.map((option: { value: string; label: string }) => (
				<option
					key={option?.value}
					value={option?.value}
					className="text-black cursor-pointer"
				>
					{option?.label}
				</option>
			))}
		</select>
	);
};

export default SelectDropdown;
