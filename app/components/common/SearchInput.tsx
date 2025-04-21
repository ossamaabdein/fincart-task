const SearchInput = ({ searchQuery, setSearchQuery }: any) => {
	return (
		<input
			type="text"
			placeholder="Search products..."
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)}
			className="border border-gray-300 rounded px-4 py-2 w-full"
		/>
	);
};

export default SearchInput;
