import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Usecase } from "../usecase"

export type BuyProductInputDto = {
    id: string,
    amount: number,
}

export type ByuProductOutputDto = {
    id: string,
    balance: number,
}

export class BuyProductUsecase
    implements Usecase<BuyProductInputDto, ByuProductOutputDto> {

    private constructor(private readonly productGateway: ProductGateway) { }

    public static create(productGateway: ProductGateway) {
        return new BuyProductUsecase(productGateway);
    }

    public async execute({id, amount}: BuyProductInputDto): Promise<ByuProductOutputDto> {
        const aProduct = await this.productGateway.find(id);
        if(!aProduct) throw new Error(`Product id: ${id} not found`);
        aProduct.increaseQuantity(amount);
        await this.productGateway.update(aProduct);
        return this.presentOutput(aProduct);
    }

    private presentOutput(product: Product) {
        const output: ByuProductOutputDto = {
            id: product.id,
            balance: product.quantity
        }
        return output;
    }

}