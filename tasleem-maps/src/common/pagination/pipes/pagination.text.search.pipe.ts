import { Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common/interfaces';
import { PaginationService } from 'src/common/pagination/services/pagination.service';

export function PaginationTextSearchPipe(): Type<PipeTransform> {
    @Injectable()
    class MixinPaginationTextSearchPipe implements PipeTransform {
        constructor(private readonly paginationService: PaginationService) {}

        async transform(
            value: Record<string, any>
        ): Promise<Record<string, any>> {
            const _search: Record<string, any> = this.paginationService.textSearch(
                value?.search
            );

            return {
                ...value,
                _search,
            };
        }
    }

    return mixin(MixinPaginationTextSearchPipe);
}
