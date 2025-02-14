
//Class that holds useful static methods for fetching data
class FetchData {
    static APIurl = "https://learning-hub-1whk.onrender.com/";

    static init = {
        method: 'GET',
        headers: new Headers().append('Accept', 'application/json')
    };

    static async fetchCategories() {
        const response = await fetch(this.APIurl + 'categories', this.init);
        const result = await response.json();
        return result;
    }

    static async fetchSubcategories() {
        const response = await fetch(this.APIurl + 'subcategories', this.init);
        const result = await response.json();
        return result;
    }

    static async fetchSubcategory(categoryId) {
        const response = await fetch(this.APIurl + `categories/${categoryId}/subcategories`, this.init);
        const result = await response.json();
        return result;
    }

    static async fetchLearningItemsBySubcategory(subcategoryId) {
        const response = await fetch(this.APIurl + `learning-items?subcategory=${subcategoryId}`, this.init);
        const result = await response.json();
        return result;
    }

    static async fetchLearningItemsByCategory(categoryId) {
        const response = await fetch(this.APIurl + `learning-items?category=${categoryId}`, this.init);
        const result = await response.json();
        return result;
    }

    static async fetchCartItems(username){
        if (username) {
            const response = await fetch(`/cart?username=${username}`,this.init)
            const data = await response.json();
            return data;
        } 
    }

    //Updates cart items count on profile UI element
    static async updateCartItemsDisplay(){
        const cartItemsDisplay = document.getElementById('cart-items-display');
        const user = sessionStorage.getItem('username');
        if(user){
            const cartItems = await FetchData.fetchCartItems(user);
            if(cartItems){
                const cartItemsCount = cartItems.cartItems.length;
                cartItemsDisplay.textContent = cartItemsCount + ''; 
            }
        } 
        
    }
    
}


