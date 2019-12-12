import {ConflictException, Injectable, InternalServerErrorException, Logger} from '@nestjs/common';
import {FormDefinition} from './form-definition.dto';

import {ClientProxy, ClientProxyFactory, Transport} from '@nestjs/microservices';

@Injectable()
export class FormDefinitionService {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: '127.0.0.1',
                port: 8877,
            },
        });
    }

    fromDefinitions: FormDefinition[] = [];
    private logger = new Logger('FormDefinitionService');

    // Call message pattern to create form definition (microservice)
    async addFormDefinition(formDefinition: FormDefinition) {
        // @ts-ignore
        return this.client.send('addformdefinition', formDefinition);
    }

    // Read Form definition by service name
    async getFormDefinition(service: string) {
        return this.client.send('getformdefinition', service);
    }

    // Delete Form definition by service name
    async deleteFormDefinition(service: string) {
        return this.client.send('deleteformdefinition', service);
    }

    // Update Form definition
    async updateFormDefinition(service, formDefinition) {
        return this.client.send('updateformdefinition', service);
    }
}
