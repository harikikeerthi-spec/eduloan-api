const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const users = await prisma.user.findMany({
            select: {
                email: true,
                firstName: true,
                lastName: true
            }
        });

        console.log('\n--- STORED EMAILS ---');
        if (users.length === 0) {
            console.log('No users found in the database. (Tables were reset during migration)');
        } else {
            users.forEach((u, index) => {
                console.log(`${index + 1}. ${u.email} - ${u.firstName} ${u.lastName || ''}`);
            });
        }
        console.log('---------------------\n');

    } catch (error) {
        console.error('Error fetching users:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
