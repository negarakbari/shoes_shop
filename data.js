

const PRODUCTS = [
    {
        id: 1,
        name: "Nike Air Max 270",
        price: 120.00,
        brand: "nike",
        image: "shoeimg/1.png",
        sold: 4210,
        rating: 4.5,
        reviews: 3821,
        description: "Inspired by two icons of big Air — the Air Max 180 and the iconic Air Max 93, the Nike Air Max 270 delivers a fresh look with a large Air unit for all-day comfort and a bold heel that pays homage to the original."
    },
    {
        id: 2,
        name: "Nike Revolution 6",
        price: 85.00,
        brand: "nike",
        image: "shoeimg/2.png",
        sold: 2980,
        rating: 4.2,
        reviews: 2104,
        description: "The Nike Revolution 6 delivers a smooth, comfortable ride whether you're training or just hanging out. Its lightweight foam midsole cushions every step."
    },
    {
        id: 3,
        name: "Adidas Ultraboost",
        price: 180.00,
        brand: "adidas",
        image: "shoeimg/3.png",
        sold: 6100,
        rating: 4.7,
        reviews: 5389,
        description: "The Adidas Ultraboost features a responsive BOOST midsole that returns energy with every stride for an incredible running experience. The Primeknit upper wraps your foot in adaptive support."
    },
    {
        id: 4,
        name: "Adidas Stan Smith",
        price: 90.00,
        brand: "adidas",
        image: "shoeimg/4.png",
        sold: 8750,
        rating: 4.6,
        reviews: 7203,
        description: "A timeless classic, the Adidas Stan Smith has been a staple of street style since its debut on the tennis court in the 1970s. Clean and minimal, it goes with everything."
    },
    {
        id: 5,
        name: "Puma RS-X",
        price: 110.00,
        brand: "puma",
        image: "shoeimg/5.png",
        sold: 3300,
        rating: 4.1,
        reviews: 2890,
        description: "The Puma RS-X is a bold, chunky sneaker that takes the iconic RS (Running System) technology to a whole new level of style with an oversized sole and vibrant colorways."
    },
    {
        id: 6,
        name: "Asics Gel-Nimbus",
        price: 150.00,
        brand: "asics",
        image: "shoeimg/6.png",
        sold: 2100,
        rating: 4.8,
        reviews: 1940,
        description: "The ASICS Gel-Nimbus is built for the long run, offering maximum cushioning with GEL technology and a breathable upper for premium all-day comfort."
    },
    {
        id: 7,
        name: "Reebok Classic",
        price: 75.00,
        brand: "reebok",
        image: "shoeimg/1.png",
        sold: 5400,
        rating: 4.3,
        reviews: 4612,
        description: "The Reebok Classic Leather is a timeless silhouette that blends clean heritage style with everyday comfort. Soft leather upper and die-cut EVA midsole keep you fresh."
    },
    {
        id: 8,
        name: "New Balance 574",
        price: 95.00,
        brand: "newbalance",
        image: "shoeimg/2.png",
        sold: 4800,
        rating: 4.4,
        reviews: 4100,
        description: "The New Balance 574 is a versatile classic that pairs well with everything from jeans to joggers. ENCAP midsole technology provides support and durability."
    },
    {
        id: 9,
        name: "Converse Chuck 70",
        price: 85.00,
        brand: "converse",
        image: "shoeimg/3.png",
        sold: 7200,
        rating: 4.5,
        reviews: 6530,
        description: "The Chuck 70 draws from the rich archive of Converse history with premium materials and vintage details. More cushioning and higher quality construction than the original."
    },
];


const Cart = {
    getItems() {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    },

    saveItems(items) {
        localStorage.setItem('cart', JSON.stringify(items));
    },

    addItem(productId, size, color, quantity) {
        const items = this.getItems();
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return false;

        const existingIndex = items.findIndex(
            i => i.id === productId && i.size === size && i.color === color
        );

        if (existingIndex > -1) {
            items[existingIndex].quantity += quantity;
        } else {
            items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                brand: product.brand,
                size,
                color,
                quantity
            });
        }

        this.saveItems(items);
        return true;
    },

    removeItem(index) {
        const items = this.getItems();
        items.splice(index, 1);
        this.saveItems(items);
    },

    updateQuantity(index, quantity) {
        const items = this.getItems();
        if (quantity < 1) {
            this.removeItem(index);
            return;
        }
        items[index].quantity = quantity;
        this.saveItems(items);
    },

    getTotalCount() {
        return this.getItems().reduce((sum, i) => sum + i.quantity, 0);
    },

    getTotalPrice() {
        return this.getItems().reduce((sum, i) => sum + i.price * i.quantity, 0);
    },

    clear() {
        localStorage.removeItem('cart');
    }
};


const Orders = {
    getAll() {
        return JSON.parse(localStorage.getItem('orders') || '[]');
    },

   
    placeOrder(cartItems) {
        const all = this.getAll();
        const orderId = 'ORD-' + Date.now();

        cartItems.forEach(item => {
            all.unshift({
                orderId,
                productId: item.id,
                name:      item.name,
                image:     item.image,
                color:     item.color,
                size:      item.size,
                qty:       item.quantity,
                price:     item.price,
                status:    'active',
                placedAt:  new Date().toISOString()
            });
        });

        localStorage.setItem('orders', JSON.stringify(all));
    },

    getActive() {
        return this.getAll().filter(o => o.status === 'active');
    },

    getCompleted() {
        return this.getAll().filter(o => o.status === 'completed');
    },

   
    markCompleted(orderId) {
        const all = this.getAll().map(o =>
            o.orderId === orderId ? { ...o, status: 'completed' } : o
        );
        localStorage.setItem('orders', JSON.stringify(all));
    }
};
