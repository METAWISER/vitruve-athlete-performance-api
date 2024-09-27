import { AthleteRepository } from "../../../../src/Athletes/infrastructure/AthleteRepository";
import { AthleteInstance } from "../../../../src/Athletes/infrastructure/AthleteInstance";
import { Athlete } from "../../../../src/Athletes/domain/Athlete";
import { DomainError } from "../../../../src/shared/domain/errors/DomainError";

jest.mock("../../../../src/Athletes/infrastructure/AthleteInstance");

describe("AthleteRepository - create", () => {
  let repository: AthleteRepository;

  beforeEach(() => {
    repository = new AthleteRepository(AthleteInstance);
    jest.clearAllMocks();
  });

  it("should create a new athlete if not already registered", async () => {
    (AthleteInstance.findOne as jest.Mock).mockResolvedValue(null);
    (AthleteInstance.create as jest.Mock).mockResolvedValue({});

    const athlete = Athlete.fromPrimitives({
      uid: "some-uid",
      name: "John Doe",
      age: 30,
      email: "john@vitruve.com",
      password: "password",
      team: "Team A",
    });

    await repository.create(athlete);
    expect(AthleteInstance.create).toHaveBeenCalledWith(athlete.toPrimitives());
  });

  it("should throw an error if an athlete with the same email already exists", async () => {
    (AthleteInstance.findOne as jest.Mock).mockResolvedValue({
      toJSON: () => ({
        uid: "some-uid",
        name: "John Doe",
        age: 30,
        email: "john@vitruve.com",
        password: "password",
        team: "Team A",
      }),
    });

    const athlete = Athlete.fromPrimitives({
      uid: "some-uid",
      name: "John Doe",
      age: 30,
      email: "john@vitruve.com",
      password: "password",
      team: "Team A",
    });

    await expect(repository.create(athlete)).rejects.toThrow(DomainError);
    expect(AthleteInstance.create).not.toHaveBeenCalled();
  });
});
