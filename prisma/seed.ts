import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.category.createMany({
    data: [
      { name: 'General' },
      { name: 'Work' },
      { name: 'Personal' }
    ],
    skipDuplicates: true
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
