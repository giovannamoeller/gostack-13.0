import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";
import { container } from 'tsyringe';
import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository";
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthentication';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

// Rota: recebe a requisição, chama outro arquivo e devolve uma resposta

/*appointmentsRouter.get("/", async (req, res) => {
  const appointmentsList = await appointmentsRepository.find();

  return res.json(appointmentsList);
});*/

appointmentsRouter.post("/", async (req, res) => {

    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);
    
    const appointment = await createAppointment.execute({ provider_id, date: parsedDate });
    return res.json(appointment);

});

export default appointmentsRouter;
