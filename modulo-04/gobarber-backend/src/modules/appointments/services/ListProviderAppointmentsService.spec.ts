
import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointments: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
    beforeEach(() => {
        fakeAppointments = new FakeAppointmentsRepository();
        listProviderAppointmentsService = new ListProviderAppointmentsService(fakeAppointments);
    });

    it("should be able to list the appointments on a specific day", async () => {
        const appointment1 = await fakeAppointments.create({
            provider_id: 'provider-id',
            user_id: 'user-id',
            date: new Date(2020, 10, 20, 8, 0, 0)
        });

        const appointment2 = await fakeAppointments.create({
            provider_id: 'provider-id',
            user_id: 'user-id',
            date: new Date(2020, 10, 20, 9, 0, 0)
        });

        const appointments = await listProviderAppointmentsService.execute({
            provider_id: 'provider-id',
            day: 20,
            month: 11,
            year: 2020,
        });

        expect(appointments).toEqual([
            appointment1,
            appointment2
        ]);
        
    });
});