import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Usecase } from "../usecase"

export type SellProductInputDto = {
    id: string,
    amount: number
}

export type SellProductOutputDto = {
    id: string,
    balance: number,
}

export class SellProductUseCase
    implements Usecase<SellProductInputDto, SellProductOutputDto> {

    private constructor(private readonly productGateway: ProductGateway) { }

    public static create(productGateway: ProductGateway) {
        return new SellProductUseCase(productGateway);
    }
    public async execute({id, amount}: SellProductInputDto): Promise<SellProductOutputDto> {
        const aProduct = await this.productGateway.find(id);
        if(!aProduct) throw new Error(`Product id: ${id} not found`);
        aProduct.sell(amount);
        await this.productGateway.update(aProduct);
        return this.presentOutput(aProduct);
    }

    private presentOutput(product: Product) {
        const output: SellProductOutputDto = {
            id: product.id,
            balance: product.quantity
        }
        return output;
    }
}

