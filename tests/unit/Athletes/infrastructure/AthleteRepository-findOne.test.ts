import { AthleteRepository } from '../../../../src/Athletes/infrastructure/AthleteRepository';
import { AthleteInstance } from '../../../../src/Athletes/infrastructure/AthleteInstance';
import { AthleteId } from '../../../../src/Athletes/domain/interfaces/AthleteId';
import { DomainError } from '../../../../src/shared/domain/errors/DomainError';

jest.mock('../../../../src/Athletes/infrastructure/AthleteInstance'); 

describe('AthleteRepository - findOne', () => {
  let repository: AthleteRepository;

  beforeEach(() => {
    repository = new AthleteRepository(AthleteInstance);
  });

  it('should return an athlete when found', async () => {
    const mockAthleteData = {
      uid: 'some-uid',
      name: 'John Doe',
      age: 30,
      email: 'john@example.com',
      team: 'Team A'
    };

    (AthleteInstance.findByPk as jest.Mock).mockResolvedValue({
      toJSON: () => mockAthleteData,
    });

    const athleteId = new AthleteId('some-uid');
    const result = await repository.findById(athleteId.value);

    expect(AthleteInstance.findByPk).toHaveBeenCalledWith('some-uid');
    expect(result.toJSON()).toMatchObject(mockAthleteData);
  });

  it('should throw a DomainError if athlete is not found', async () => {
    (AthleteInstance.findByPk as jest.Mock).mockResolvedValue(null);

    const athleteId = new AthleteId('non-existing-uid');

    await expect(repository.findById(athleteId.value)).rejects.toThrow(
      new DomainError(`Athlete with ID ${athleteId.value} not found`)
    );
    expect(AthleteInstance.findByPk).toHaveBeenCalledWith('non-existing-uid');
  });
});
