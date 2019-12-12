import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {Logger} from '@nestjs/common';
import {ClientProxy, ClientProxyFactory, Transport} from '@nestjs/microservices';

@Injectable()
export class FormSubmissionService {

    private logger = new Logger('FormSubmissionService');
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
    async submitForm(formSubmission) {
        return this.client.send('addformsubmission', formSubmission);

    }
}
