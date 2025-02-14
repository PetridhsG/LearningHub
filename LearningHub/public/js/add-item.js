window.addEventListener("DOMContentLoaded", main);

function main() {
    document.addEventListener('itemsRendered', () => {
        // Attach the same event listener to every button inside the learning-items-container
        const container = document.querySelector('#learning-items-container');
        if (container) {
            container.addEventListener('click', handleButtonClick);
        }
    });

    async function handleButtonClick(event) {
        // Add event listener only to element that are buttons
        if (event.target.closest('.learning-item button')) {
            const item = event.target.closest('.learning-item');
            await addItem(item);
        }
    }

    async function addItem(item) {
        // Check if there is an active session
        if (sessionStorage.getItem('sessionId')) {
            FetchData.updateCartItemsDisplay();
            const itemId = item.querySelector(".learning-item-id").textContent;
            const itemType = item.querySelector(".learning-item-type").textContent;
            const itemCost = item.querySelector(".learning-item-cost").textContent;
            const itemTitle = item.querySelector('h2').textContent;

            const itemData = {
                id: itemId,
                type: itemType,
                cost: itemCost,
                title: itemTitle
            };

            // Get the username and sessionId from sessionStorage
            const username = sessionStorage.getItem("username");
            const sessionId = sessionStorage.getItem("sessionId");

            try {
                const response = await fetch('/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, sessionId, learningItem: itemData })
                });
``
                if (response.ok) {
                    alert('Item added successfully');
                    FetchData.updateCartItemsDisplay();
                } else {
                    alert('Item already in the cart');
                }
            } catch (error) {
                alert('There was an error adding the item to your cart.');
            }
        } else {
            alert("You should login first!");
        }
    }
}
