import { Response, Request } from "express";
import { HttpMethod, Route } from "./route";
import { SellProductOutputDto, SellProductUseCase } from "../../../../usecases/sell-product/sell-product.usecase";

export type SellProductResponseDto = {
    id: string,
    balance: number,
}

export class SellProductRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly sellProductService: SellProductUseCase,
    ) { }

    public static create(sellProductService: SellProductUseCase) {
        return new SellProductRoute(
            "/products/:id/sell",
            HttpMethod.POST,
            sellProductService
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            const { amount } = request.body;
            const output = await this.sellProductService.execute({ id, amount });
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

    private present(input: SellProductOutputDto): SellProductResponseDto {
        const response: SellProductResponseDto = input
        return response;
    }
}