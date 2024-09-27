import { AthleteRepository } from "../../../../src/Athletes/infrastructure/AthleteRepository";
import { AthleteInstance } from "../../../../src/Athletes/infrastructure/AthleteInstance";
import { Athlete } from "../../../../src/Athletes/domain/Athlete";

jest.mock("../../../../src/Athletes/infrastructure/AthleteInstance");

describe("AthleteRepository - searchAll", () => {
  let repository: AthleteRepository;

  beforeEach(() => {
    repository = new AthleteRepository(AthleteInstance);
    jest.clearAllMocks();
  });

  it("should return an array of athletes", async () => {
    const expectedAthlete = {
      uid: "fake-uid",
      name: "john doe",
      age: "30",
      email: "john@vitruve.com",
      password: "password",
      team: "team a",
    };

    const expectedResult = {
      uid: "fake-uid",
      name: "john doe",
      age: "30",
      email: "john@vitruve.com",
      team: "team a",
    };

    (AthleteInstance.findAll as jest.Mock).mockResolvedValue([
      {
        toJSON: () => expectedAthlete,
      },
    ]);

    const athletes = await repository.searchAll();
    expect(athletes[0].toPrimitives()).toMatchObject(expectedResult);
  });
  it("should return an empty array if no athletes are found", async () => {
    (AthleteInstance.findAll as jest.Mock).mockResolvedValue([]);

    const athletes = await repository.searchAll();
    expect(athletes).toHaveLength(0);
  });
});
