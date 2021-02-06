import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import 'reflect-metadata';
import { container } from 'tsyringe';

import CreateAppointmentService from '../../../services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    // eslint-disable-next-line camelcase
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  }
}
