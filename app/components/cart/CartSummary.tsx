const CartSummary = ({ totalItems, totalPrice }: { totalItems: number; totalPrice: number }) => {
    return (
        <div className="cart-summary bg-gradient-to-r from-gray-100 to-gray-200 text-black border border-gray-300 shadow-xl rounded-lg p-8 mt-8">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">
            Cart Summary
        </h2>
        <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total Items:</span>
            <span className="text-xl font-bold text-gray-800">
                {totalItems}
            </span>
        </div>
        <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold">Total Price:</span>
            <span className="text-xl font-bold text-green-700">
                ${totalPrice.toFixed(2)}
            </span>
        </div>
        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-800 transition duration-300 text-lg font-medium">
            Proceed to Checkout
        </button>
    </div>
    );
}

export default CartSummary;