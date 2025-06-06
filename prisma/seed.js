const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "mysql://root:@localhost:3306/refugiu_admin"
    }
  }
});

async function main() {
  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await prisma.admin.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Admin User'
      }
    });

    // Create photo categories
    const categories = [
      { name: 'Exterior', season: 'Vara' },
      { name: 'Exterior', season: 'Iarna' },
      { name: 'Interior', season: 'Vara' },
      { name: 'Interior', season: 'Iarna' },
      { name: 'Camere', season: 'Vara' },
      { name: 'Camere', season: 'Iarna' },
      { name: 'Bucătărie', season: 'Vara' },
      { name: 'Bucătărie', season: 'Iarna' },
      { name: 'Baie', season: 'Vara' },
      { name: 'Baie', season: 'Iarna' },
      { name: 'Facilități', season: 'Vara' },
      { name: 'Facilități', season: 'Iarna' },
      { name: 'Peisaje', season: 'Vara' },
      { name: 'Peisaje', season: 'Iarna' },
      { name: 'Grădină', season: 'Vara' },
      { name: 'Terasă', season: 'Vara' },
      { name: 'Zăpadă', season: 'Iarna' },
      { name: 'Activități', season: 'Vara' },
      { name: 'Activități', season: 'Iarna' }
    ];

    for (const category of categories) {
      await prisma.photoCategory.upsert({
        where: { 
          name_season: {
            name: category.name,
            season: category.season
          }
        },
        update: {},
        create: category
      });
    }

  } catch (error) {
    console.error('Error during seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 