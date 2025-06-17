// Mock data for the application

// Mock orders for Chef Dashboard
export const mockOrders = [
  {
    id: "ord-001",
    tableNumber: 5,
    customerName: "John Smith",
    items: [
      { id: "item-1", name: "Grilled Chicken Salad", quantity: 1, specialInstructions: "No onions, extra dressing on the side" },
      { id: "item-2", name: "Mushroom Risotto", quantity: 1 },
      { id: "item-3", name: "Sparkling Water", quantity: 2 }
    ],
    status: "pending",
    priority: "high",
    timeReceived: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    estimatedTime: 20
  },
  {
    id: "ord-002",
    tableNumber: 3,
    customerName: "Emily Johnson",
    items: [
      { id: "item-4", name: "Margherita Pizza", quantity: 1 },
      { id: "item-5", name: "Tiramisu", quantity: 1 }
    ],
    status: "cooking",
    priority: "medium",
    timeReceived: new Date(Date.now() - 1000 * 60 * 8).toISOString(), // 8 minutes ago
    estimatedTime: 15
  },
  {
    id: "ord-003",
    tableNumber: 7,
    customerName: "David Wilson",
    items: [
      { id: "item-6", name: "Beef Burger", quantity: 1, specialInstructions: "Medium well" },
      { id: "item-7", name: "French Fries", quantity: 1 },
      { id: "item-8", name: "Chocolate Milkshake", quantity: 1 }
    ],
    status: "ready",
    priority: "low",
    timeReceived: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 minutes ago
    estimatedTime: 18
  },
  {
    id: "ord-004",
    tableNumber: 2,
    customerName: "Sarah Brown",
    items: [
      { id: "item-9", name: "Seafood Pasta", quantity: 2, specialInstructions: "Extra spicy" },
      { id: "item-10", name: "Caesar Salad", quantity: 1 },
      { id: "item-11", name: "Red Wine", quantity: 1 }
    ],
    status: "pending",
    priority: "high",
    timeReceived: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    estimatedTime: 25,
    specialRequests: "Celebrating anniversary, please add a candle to dessert"
  }
];

// Mock tables for Waiter Dashboard
export const mockTables = [
  { id: 1, number: 1, status: 'available', capacity: 2, hasActiveOrder: false },
  { id: 2, number: 2, status: 'occupied', capacity: 4, hasActiveOrder: true },
  { id: 3, number: 3, status: 'occupied', capacity: 4, hasActiveOrder: false },
  { id: 4, number: 4, status: 'available', capacity: 6, hasActiveOrder: false },
  { id: 5, number: 5, status: 'occupied', capacity: 2, hasActiveOrder: true },
  { id: 6, number: 6, status: 'reserved', capacity: 8, hasActiveOrder: false },
  { id: 7, number: 7, status: 'occupied', capacity: 2, hasActiveOrder: true },
  { id: 8, number: 8, status: 'available', capacity: 4, hasActiveOrder: false },
  { id: 9, number: 9, status: 'reserved', capacity: 2, hasActiveOrder: false },
  { id: 10, number: 10, status: 'available', capacity: 6, hasActiveOrder: false },
];

// Mock menu items for Waiter Dashboard
export const mockMenuItems = [
  {
    id: "menu-001",
    name: "Margherita Pizza",
    category: "mains",
    price: 12.99,
    description: "Classic pizza with tomato sauce, fresh mozzarella, basil, and olive oil",
    imageUrl: "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "menu-002",
    name: "Caesar Salad",
    category: "starters",
    price: 8.99,
    description: "Romaine lettuce with Caesar dressing, croutons, and parmesan cheese",
    imageUrl: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "menu-003",
    name: "Beef Burger",
    category: "mains",
    price: 14.99,
    description: "Grilled beef patty with lettuce, tomato, onion, and special sauce on a brioche bun",
    imageUrl: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "menu-004",
    name: "Tiramisu",
    category: "desserts",
    price: 7.99,
    description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
    imageUrl: "https://images.pexels.com/photos/6341984/pexels-photo-6341984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "menu-005",
    name: "Mushroom Risotto",
    category: "mains",
    price: 16.99,
    description: "Creamy arborio rice with wild mushrooms, white wine, and parmesan",
    imageUrl: "https://images.pexels.com/photos/5638766/pexels-photo-5638766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "menu-006",
    name: "French Fries",
    category: "starters",
    price: 4.99,
    description: "Crispy golden french fries seasoned with sea salt",
    imageUrl: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "menu-007",
    name: "Chocolate Brownie",
    category: "desserts",
    price: 6.99,
    description: "Warm chocolate brownie with vanilla ice cream and chocolate sauce",
    imageUrl: "https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "menu-008",
    name: "Grilled Salmon",
    category: "mains",
    price: 18.99,
    description: "Grilled salmon fillet with lemon butter sauce and seasonal vegetables",
    imageUrl: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];