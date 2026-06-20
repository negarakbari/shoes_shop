

const urlParams = new URLSearchParams(window.location.search);
const selectedBrand = urlParams.get('name');

function showBrandProducts() {
    const filtered = PRODUCTS.filter(
        p => p.brand.toLowerCase() === selectedBrand.toLowerCase()
    );

    document.getElementById('brand-name').innerText = selectedBrand.toUpperCase();

    const container = document.getElementById('product-list');
    container.innerHTML = '';

    if (filtered.length === 0) {
        container.innerHTML = '<p class="col-span-2 text-center text-gray-400 py-10">No products found.</p>';
        return;
    }

    filtered.forEach(product => {
        container.innerHTML += `
            <a href="product.html?id=${product.id}" class="flex flex-col">
                <div class="bg-[#F3F3F3] rounded-[32px] p-6 aspect-square flex items-center justify-center mb-3">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-auto object-contain">
                </div>
                <h3 class="font-bold text-[16px] text-gray-900 truncate">${product.name}</h3>
                <p class="font-bold text-gray-900 mt-1">$${product.price.toFixed(2)}</p>
            </a>
        `;
    });
}

showBrandProducts();
