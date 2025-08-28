import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@everestkitchen.de' },
    update: {},
    create: {
      email: 'admin@everestkitchen.de',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      phone: '+49 89 123 4567',
    },
  });

  // Create manager user
  const managerPassword = await bcrypt.hash('manager123', 12);
  const manager = await prisma.user.upsert({
    where: { email: 'manager@everestkitchen.de' },
    update: {},
    create: {
      email: 'manager@everestkitchen.de',
      password: managerPassword,
      name: 'Restaurant Manager',
      role: 'MANAGER',
      phone: '+49 89 234 5678',
    },
  });

  // Create sample customers
  const customerPassword = await bcrypt.hash('customer123', 12);
  const customers = await Promise.all([
    prisma.user.upsert({
      where: { email: 'anna@example.com' },
      update: {},
      create: {
        email: 'anna@example.com',
        password: customerPassword,
        name: 'Anna Mueller',
        role: 'CUSTOMER',
        phone: '+49 89 345 6789',
        address: 'Maximilianstrasse 15, 80331 München',
      },
    }),
    prisma.user.upsert({
      where: { email: 'david@example.com' },
      update: {},
      create: {
        email: 'david@example.com',
        password: customerPassword,
        name: 'David Schmidt',
        role: 'CUSTOMER',
        phone: '+49 89 456 7890',
        address: 'Marienplatz 8, 80331 München',
      },
    }),
  ]);

  // Create menu items
  const menuItems = await Promise.all([
    prisma.menuItem.create({
      data: {
        name: 'Traditional Chicken Momos',
        description: 'Steamed dumplings filled with seasoned chicken, served with spicy tomato chutney',
        price: 12.90,
        category: 'momos',
        image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg',
        isVegetarian: false,
        spiceLevel: 2,
        ingredients: 'Chicken, Flour, Onions, Garlic, Ginger, Spices',
        allergens: 'Gluten',
        rating: 4.9,
        orderCount: 156,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Vegetable Momos',
        description: 'Fresh vegetables and herbs wrapped in delicate dumpling skin, perfectly steamed',
        price: 10.90,
        category: 'momos',
        image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg',
        isVegetarian: true,
        spiceLevel: 1,
        ingredients: 'Mixed Vegetables, Flour, Herbs, Spices',
        allergens: 'Gluten',
        rating: 4.8,
        orderCount: 134,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Dal Bhat Tarkari',
        description: 'Traditional lentil curry with basmati rice, seasonal vegetables, and pickle',
        price: 15.90,
        category: 'rice',
        image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg',
        isVegetarian: true,
        spiceLevel: 2,
        ingredients: 'Lentils, Rice, Vegetables, Spices',
        allergens: '',
        rating: 4.9,
        orderCount: 98,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Himalayan Chicken Curry',
        description: 'Tender chicken in aromatic curry with traditional Himalayan spices and fresh herbs',
        price: 18.90,
        category: 'curries',
        image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
        isVegetarian: false,
        spiceLevel: 3,
        ingredients: 'Chicken, Onions, Tomatoes, Spices, Herbs',
        allergens: '',
        rating: 4.7,
        orderCount: 87,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Masala Chai',
        description: 'Traditional spiced tea with milk, cardamom, and cinnamon',
        price: 3.50,
        category: 'drinks',
        image: 'https://images.pexels.com/photos/1894810/pexels-photo-1894810.jpeg',
        isVegetarian: true,
        spiceLevel: 0,
        ingredients: 'Tea, Milk, Cardamom, Cinnamon, Ginger',
        allergens: 'Dairy',
        rating: 4.8,
        orderCount: 203,
      },
    }),
  ]);

  // Create sample orders
  const orders = await Promise.all([
    prisma.order.create({
      data: {
        orderNumber: 'EK001234',
        customerId: customers[0].id,
        customerName: customers[0].name,
        customerPhone: customers[0].phone!,
        customerEmail: customers[0].email,
        type: 'DELIVERY',
        status: 'PREPARING',
        total: 41.70,
        deliveryFee: 3.50,
        address: customers[0].address,
        notes: 'Extra spicy please',
        paymentStatus: 'PAID',
        estimatedTime: '16:00',
        items: {
          create: [
            {
              menuItemId: menuItems[0].id,
              quantity: 2,
              price: menuItems[0].price,
            },
            {
              menuItemId: menuItems[2].id,
              quantity: 1,
              price: menuItems[2].price,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        orderNumber: 'EK001235',
        customerId: customers[1].id,
        customerName: customers[1].name,
        customerPhone: customers[1].phone!,
        customerEmail: customers[1].email,
        type: 'PICKUP',
        status: 'READY',
        total: 25.30,
        deliveryFee: 0,
        paymentStatus: 'PAID',
        estimatedTime: '15:30',
        items: {
          create: [
            {
              menuItemId: menuItems[1].id,
              quantity: 2,
              price: menuItems[1].price,
            },
            {
              menuItemId: menuItems[4].id,
              quantity: 1,
              price: menuItems[4].price,
            },
          ],
        },
      },
    }),
  ]);

  // Create sample reviews
  await Promise.all([
    prisma.review.create({
      data: {
        customerId: customers[0].id,
        rating: 5,
        comment: 'Amazing food! The momos were perfect and the service was outstanding.',
        platform: 'Google',
        status: 'APPROVED',
      },
    }),
    prisma.review.create({
      data: {
        customerId: customers[1].id,
        rating: 4,
        comment: 'Great authentic Nepalese food. Will definitely come back!',
        platform: 'TripAdvisor',
        status: 'PENDING',
      },
    }),
  ]);

  // Create settings
  await Promise.all([
    prisma.settings.upsert({
      where: { key: 'restaurant_name' },
      update: {},
      create: {
        key: 'restaurant_name',
        value: 'Everest Kitchen',
      },
    }),
    prisma.settings.upsert({
      where: { key: 'delivery_radius' },
      update: {},
      create: {
        key: 'delivery_radius',
        value: '20',
      },
    }),
    prisma.settings.upsert({
      where: { key: 'delivery_fee' },
      update: {},
      create: {
        key: 'delivery_fee',
        value: '3.50',
      },
    }),
  ]);

  console.log('Database seeded successfully!');
  console.log('Admin user: admin@everestkitchen.de / admin123');
  console.log('Manager user: manager@everestkitchen.de / manager123');
  console.log('Customer users: anna@example.com / customer123, david@example.com / customer123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });