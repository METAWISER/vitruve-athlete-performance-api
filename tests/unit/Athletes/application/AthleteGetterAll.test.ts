import { AthleteGetterAll } from '../../../../src/Athletes/application/AthleteGetterAll';
import { AthleteRepository } from '../../../../src/Athletes/infrastructure/AthleteRepository';
import { Athlete } from '../../../../src/Athletes/domain/Athlete';
import { AthleteEmail } from '../../../../src/Athletes/domain/interfaces/AthleteEmail';
import { AthletePassword } from '../../../../src/Athletes/domain/interfaces/AthletePassword';

describe('AthleteGetterAll', () => {
  let athleteGetterAll: AthleteGetterAll;
  let athleteRepositoryMock: jest.Mocked<AthleteRepository>;

  beforeEach(() => {
    athleteRepositoryMock = {
      searchAll: jest.fn(),
    } as unknown as jest.Mocked<AthleteRepository>;

    athleteGetterAll = new AthleteGetterAll(athleteRepositoryMock);
  });

  it('should return an array of athletes', async () => {
    const mockAthletes: Athlete[] = [
      new Athlete(
        { value: 'some-uuid' },
        { value: 'John Doe' },
        { value: 30 },
        { value: 'email@vitruve.com' } as AthleteEmail,
        { value: 'password' } as AthletePassword,
        { value: 'Team A' }
      ),
    ];

    athleteRepositoryMock.searchAll.mockResolvedValue(mockAthletes);

    const expectedAthletes = mockAthletes.map(athlete => {
      const { password, ...athleteWithoutPassword } = athlete;
      return athleteWithoutPassword;
    });

    const result = await athleteGetterAll.run();

    expect(athleteRepositoryMock.searchAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedAthletes);
  });

  it('should return an empty array if no athletes are found', async () => {
    athleteRepositoryMock.searchAll.mockResolvedValue([]);

    const result = await athleteGetterAll.run();
    expect(athleteRepositoryMock.searchAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });
});
