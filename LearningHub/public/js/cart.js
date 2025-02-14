const { useState, useEffect } = React;

function Cart() {
    const username = sessionStorage.getItem('username');
    const [cartItems, setCartItems] = useState([]);     // Add state for cartItems 
    const [totalCost, setTotalCost] = useState(0);      // Add state for totalCost

    useEffect(() => {
        // If there is an active session
        if (sessionStorage.getItem('sessionId')) {
            const fetchCartItems = async () => {
                try {
                    const response = await fetch(`/cart?username=${username}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch cart");
                    }
                    const data = await response.json();
                    setCartItems(data.cartItems);
                    setTotalCost(data.totalCost);
                } catch (error) {
                    console.error("Error fetching cart items:", error);
                }
            };
            fetchCartItems();        
        }

    }, []);

    // Remove the item with the given itemId from the user cart
    const removeItem = async (itemId) => {
        try {
            const response = await fetch(`/cart/remove`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, itemId }),
            });
            // Update the app state for cartItems and totalCost
            const updatedCart = await response.json();
            setCartItems(updatedCart.cartItems);
            setTotalCost(updatedCart.totalCost);
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    // Create the cart-container UI element
    return (
        <div className="cart-container">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p id="empty-cart">Your cart is empty.</p>
            ) : (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Title</th>
                                <th>Cost</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (  // Create every cart item UI element
                                <tr key={item.id}>
                                    <td>{item.type}</td>
                                    <td>{item.title}</td>
                                    <td>{item.cost}€</td>
                                    <td>
                                        <button onClick={() => removeItem(item.id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3>Total Cost: {totalCost}€</h3>
                </div>
            )}
        </div>
    );
}

ReactDOM.render(<Cart />, document.getElementById("root"));
