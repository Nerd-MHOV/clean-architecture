import { ApiExpress } from "./infra/api/express/api.express";
import { CreateProductRoute } from "./infra/api/express/routes/create-product.express.route";
import { ListProductRoute } from "./infra/api/express/routes/list-product.express.route";
import { ProductRepositoryPrisma } from "./infra/repositories/product/product.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { CreateProductUsecase } from "./usecases/create-product/create-product.usecase";
import { ListProductUsecase } from "./usecases/list-product/list-product.usecase";

function main() {

    const aRepository = ProductRepositoryPrisma.create(prisma);
    
    const createProductUseCase = CreateProductUsecase.create(aRepository);
    const listProductUseCase = ListProductUsecase.create(aRepository);

    const createRoute = CreateProductRoute.create(createProductUseCase);
    const listRoute = ListProductRoute.create(listProductUseCase);
    
    const api = ApiExpress.create([createRoute, listRoute])
    const port = 3333;
    api.start(port);
}

main();