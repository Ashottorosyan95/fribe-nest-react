import {
  Body,
  Controller, InternalServerErrorException, Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserServicesUsageService } from '../services/user-services-usage.service';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants/error.status-code.constant';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { UserServicesUsageCreateDto } from '../dtos/user-services-usage.create.dto';
import { UserServicesUsageCreateDoc } from '../docs/user-services-usage.admin.doc';
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';
import { Response } from 'src/common/response/decorators/response.decorator';

@ApiTags('common.admin.user-services-usage')
@Controller({
  version: '1',
  path: '/user-services-usage',
})
export class UserServicesUsageAdminController {
  constructor(private readonly userServicesUsageService: UserServicesUsageService) { }

  @UserServicesUsageCreateDoc()
  @Response('user-services-usage.create', {
    serialization: ResponseIdSerialization,
  })
  @Post('/create')
  async create(
    @Body()
    body: UserServicesUsageCreateDto
  ): Promise<IResponse> {
    try {
      const create = await this.userServicesUsageService.create(body);

      return {
        data: {
          _id: create._id,
        }
      };
    } catch (err) {
      console.log(err);

      throw new InternalServerErrorException({
        statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
        message: 'http.serverError.internalServerError',
        _error: err.message,
      });
    }
  }
}
