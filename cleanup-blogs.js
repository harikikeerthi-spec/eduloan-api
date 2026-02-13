const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Starting cleanup...');

    // 1. Remove the old duplicate blog
    const oldSlug = 'education-loans-fixed-vs-floating';
    try {
        const deleted = await prisma.blog.delete({
            where: { slug: oldSlug },
        });
        console.log(`Deleted old blog: ${deleted.title} (${oldSlug})`);
    } catch (e) {
        if (e.code === 'P2025') {
            console.log(`Old blog '${oldSlug}' already deleted or not found.`);
        } else {
            console.error(`Error deleting '${oldSlug}':`, e.message);
        }
    }

    // 2. Update Success Story image
    const successSlug = 'success-story-small-town-to-stanford';
    const newImage = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'; // Graduation/Success theme

    try {
        const updated = await prisma.blog.update({
            where: { slug: successSlug },
            data: { featuredImage: newImage },
        });
        console.log(`Updated image for: ${updated.title}`);
    } catch (e) {
        console.error(`Error updating '${successSlug}':`, e.message);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
