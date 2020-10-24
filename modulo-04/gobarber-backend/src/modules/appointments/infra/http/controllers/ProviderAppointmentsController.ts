import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProviderAppointmentsService from "@modules/appointments/services/ListProviderAppointmentsService";

class ProviderAppointmentsController {
    public async index (request: Request, response: Response): Promise<Response> {
        const provider_id  = request.user.id;
        const { day, month, year } = request.body;

        const listProviderAppointments = container.resolve(ListProviderAppointmentsService);

        const providers = await listProviderAppointments.execute({ provider_id, day, month, year });

        return response.json(providers);
    }
}

export default ProviderAppointmentsController;