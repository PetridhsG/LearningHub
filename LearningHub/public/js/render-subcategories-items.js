window.addEventListener("DOMContentLoaded", main);

async function main() {
    await renderSubcategoriesItems();
}

async function renderSubcategoriesItems() {

    // Get subcategoryId from url parameters
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoryId = parseInt(urlParams.get('id'), 10); 
 
    let subcategories = await FetchData.fetchSubcategories();
    let learningItems = await FetchData.fetchLearningItemsBySubcategory(subcategoryId);

    // Find the subcategory title for the selected subcategoryId to be displayed as header in the page
    let subcategoryTitle = subcategories.find(sub => sub.id === subcategoryId).title;

    // Update image urls so every image has the correct url
    learningItems.forEach(learningItem => {
        learningItem.image = FetchData.APIurl + learningItem.image ;
    });

    // Display the following message if there aren't any learning items for this subcategory
    let noItemsMessage = learningItems.length === 0 ? "No Learning Items For This Subcategory" : "";

    const templateSource = document.getElementById('subcategory-items-template').innerHTML;
    const template = Handlebars.compile(templateSource);

    // Add custom Helper for equality check
    Handlebars.registerHelper('eq', function (a, b) {
        return a === b;
    });

    // Add custom Helper to split the features by the given delimeter
    Handlebars.registerHelper('split', function(string, delimiter) {
        if (typeof string === "string" && typeof delimiter === "string") {
            return string.split(delimiter);
        }
        return [];
    });

    const html = template({ subcategoryTitle,learningItems,noItemsMessage  });
    document.getElementById('category-items-container').innerHTML = html;
}