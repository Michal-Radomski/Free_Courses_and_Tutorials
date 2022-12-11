import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Connect the client
  await prisma.$connect();
  const allTasks = await prisma.tasks.findMany();

  console.log({ allTasks });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (error) => {
    console.error({ error });

    await prisma.$disconnect();

    process.exit(1);
  });

// async function main2() {
//   await prisma.$connect();

//   await prisma.tasks.create({
//     data: {
//       title: "Testing Node.js",
//       description: "Create a Node.js tasks application",
//     },
//   });

//   await prisma.tasks.create({
//     data: {
//       title: "Learning TS",
//       description: "Creating some CRUD APIs",
//     },
//   });

//   await prisma.tasks.create({
//     data: {
//       title: "Testing Out Node.js APIs",
//       description: "Set up some Node.js APIs",
//     },
//   });
//   const tasks = await prisma.tasks.findMany();
//   console.dir(tasks);
// }

// main2()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (error) => {
//     console.error({ error });
//     await prisma.$disconnect();
//     process.exit(1);
//   })
//   .finally(() => console.log("Job done"));
