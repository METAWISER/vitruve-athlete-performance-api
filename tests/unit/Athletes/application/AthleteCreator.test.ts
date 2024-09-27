import { AthleteCreator } from '../../../../src/Athletes/application/AthleteCreator';
import { AthleteRepository } from '../../../../src/Athletes/infrastructure/AthleteRepository';
import { Athlete } from '../../../../src/Athletes/domain/Athlete';

describe('AthleteCreator', () => {
  it('should create an athlete successfully', async () => {
    const mockAthleteRepository = {
      create: jest.fn(),
    } as unknown as AthleteRepository;

    const athleteCreator = new AthleteCreator(mockAthleteRepository);

    const athleteData = {
      name: 'John Doe',
      age: 25,
      email: 'john.doe@vitruve.com',
      password: 'password',
      team: 'Team A',
    };

    await athleteCreator.run(athleteData);

    expect(mockAthleteRepository.create).toHaveBeenCalledWith(expect.any(Athlete));
  });
});
