import prismaClient from "../../prisma";

interface ProductRequest {
    category_id: string;
}

class ListByCategoryService {
    async execute({ category_id }: ProductRequest) {
        const findCategory = await prismaClient.product.findMany({
            where: {
                category_id: category_id,
            },
        });

        if(!findCategory) {
            throw new Error("Category not found.");
        }

        return findCategory;
    }
}

export { ListByCategoryService };