import { Response, Request } from "express";
import { HttpMethod, Route } from "./route";
import { BuyProductUsecase, ByuProductOutputDto } from "../../../../usecases/buy-product/buy-product.usecase";

export type BuyProductResponseDto = {
    id: string,
    balance: number,
}

export class BuyProductRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly buyProductService: BuyProductUsecase,
    ) { }

    public static create(buyProductService: BuyProductUsecase) {
        return new BuyProductRoute(
            "/products/:id/buy",
            HttpMethod.POST,
            buyProductService
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            const { amount } = request.body;
            const output = await this.buyProductService.execute({ id, amount });
            const responseBody = this.present(output);
            response.status(200).json(responseBody).send();
        }
    }

    public getMethod(): HttpMethod {
        return this.method
    }

    public getPath(): string {
        return this.path
    }

    private present(input: ByuProductOutputDto): BuyProductResponseDto {
        const response: BuyProductResponseDto = {
            id: input.id,
            balance: input.balance,
        }
        return response;
    }
}