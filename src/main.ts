import { ApiExpress } from "./infra/api/express/api.express";
import { BuyProductRoute } from "./infra/api/express/routes/buy-product.express.route";
import { CreateProductRoute } from "./infra/api/express/routes/create-product.express.route";
import { ListProductRoute } from "./infra/api/express/routes/list-product.express.route";
import { SellProductRoute } from "./infra/api/express/routes/sell-product.express.route";
import { ProductRepositoryPrisma } from "./infra/repositories/product/product.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { BuyProductUsecase } from "./usecases/buy-product/buy-product.usecase";
import { CreateProductUsecase } from "./usecases/create-product/create-product.usecase";
import { ListProductUsecase } from "./usecases/list-product/list-product.usecase";
import { SellProductUseCase } from "./usecases/sell-product/sell-product.usecase";

function main() {

    const aRepository = ProductRepositoryPrisma.create(prisma);
    
    const createProductUseCase = CreateProductUsecase.create(aRepository);
    const listProductUseCase = ListProductUsecase.create(aRepository);
    const buyProductUseCase = BuyProductUsecase.create(aRepository); 
    const sellProductUseCase = SellProductUseCase.create(aRepository);

    const createRoute = CreateProductRoute.create(createProductUseCase);
    const listRoute = ListProductRoute.create(listProductUseCase);
    const buyRoute = BuyProductRoute.create(buyProductUseCase);
    const sellRoute = SellProductRoute.create(sellProductUseCase);       

    const api = ApiExpress.create([
        listRoute, createRoute, buyRoute, sellRoute
    ])
    const port = 3333;
    api.start(port);
}

main();