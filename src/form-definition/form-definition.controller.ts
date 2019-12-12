import {Controller, Post, Body, InternalServerErrorException, Get, Param, Patch, Logger, NotFoundException, Delete} from '@nestjs/common';
import {FormDefinitionService} from './form-definition.service';
import {FormDefinition} from './form-definition.dto';

@Controller('form-definition')
export class FormDefinitionController {
    private logger = new Logger('FormDefinitionController');

    constructor(private readonly formDefinitionService: FormDefinitionService,
    ) {
    }

    @Get(':service')
    async getFormDefinition(@Param('service') service: string) {
        try {
            const formDefinition = await this.formDefinitionService.getFormDefinition(service);

            if (formDefinition) {
                return {
                    status: 200,
                    content: formDefinition,
                };
            } else {
                throw new NotFoundException();
            }
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    @Post()
    async addFormDefinition(@Body() formDefinition: FormDefinition) {
        try {
            const result = await this.formDefinitionService.addFormDefinition(formDefinition);
            if (result) {
                return {status: 200};
            }
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }

    @Delete(':service')
    async deleteFormDefinition(@Param('service') service: string) {
        try {
            await this.formDefinitionService.deleteFormDefinition(service);
            return {
                status: 200,
            };
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    @Patch(':service')
    async updateFormDefinition(
        @Param('service') service: string,
        @Body() formDefinition: FormDefinition,
    ) {
        try {
            const result = await this.formDefinitionService.updateFormDefinition(service, formDefinition);
            return {...result};
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

}
