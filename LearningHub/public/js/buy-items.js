
window.addEventListener("DOMContentLoaded", main);

// Redirect to cart.html
function main() {
    const button = document.getElementById("buy-items-button")
    button.addEventListener("click", e => {
            window.location.href = "cart.html";
        }
    )
}

