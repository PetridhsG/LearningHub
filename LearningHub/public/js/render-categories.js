
window.addEventListener("DOMContentLoaded", main);

async function main() {
    await renderCategories();
}

async function renderCategories() {
    let categories = await FetchData.fetchCategories();

    // Fetch all subcategories and wait for all the promises to complete
    await Promise.all(
        categories.map(async (category) => {
            let subs = await FetchData.fetchSubcategory(category.id);
            category.subcategories = subs;
        })
    );

    // Update image urls so every image has the correct url
    categories.forEach(category => {
        category.img_url = FetchData.APIurl + category.img_url;
    });

    const templateSource = document.getElementById('categories-template').innerHTML;
    const template = Handlebars.compile(templateSource);

    const html = template({ categories });
    document.getElementById('categories-container').innerHTML = html;
}
