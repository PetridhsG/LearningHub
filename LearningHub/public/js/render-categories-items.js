window.addEventListener("DOMContentLoaded", main);

async function main() {
    await renderCategoriesItems();
}

async function renderCategoriesItems() {

    // Get categoryId from url parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = parseInt(urlParams.get('id'), 10); 
 
    let categories = await FetchData.fetchCategories();
    let learningItems = await FetchData.fetchLearningItemsByCategory(categoryId);

    // Find the category title for the selected categoryId to be displayed as header in the page
    let categoryTitle = categories.find(cat => cat.id === categoryId).title;

    // Update image urls so every image has the correct url
    learningItems.forEach(learningItem => {
        learningItem.image = FetchData.APIurl + learningItem.image ;
    });

    const templateSource = document.getElementById('category-items-template').innerHTML;
    const template = Handlebars.compile(templateSource);

    // Add custom Helper for equality check
    Handlebars.registerHelper('eq', function (a, b) {
        return a === b;
    });

    const html = template({ categoryTitle,learningItems });
    document.getElementById('category-items-container').innerHTML = html;

    // Add custom event to ensure the data is first compiled to Handlebars and then any function may make changes on them
    document.dispatchEvent(new CustomEvent('itemsRendered', { detail: { learningItems } }));
}