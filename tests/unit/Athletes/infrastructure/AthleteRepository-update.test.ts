import { AthleteRepository } from "../../../../src/Athletes/infrastructure/AthleteRepository";
import { AthleteInstance } from "../../../../src/Athletes/infrastructure/AthleteInstance";
import { AthleteId } from "../../../../src/Athletes/domain/interfaces/AthleteId";
import { AthleteUpdateDto } from "../../../../src/api/dtos/AthleteUpdate.dto";
import { DomainError } from "../../../../src/shared/domain/errors/DomainError";

jest.mock("../../../../src/Athletes/infrastructure/AthleteInstance");

describe("AthleteRepository - update", () => {
  let repository: AthleteRepository;

  beforeEach(() => {
    repository = new AthleteRepository(AthleteInstance);
  });

  it("should update an athlete with valid data", async () => {
    const uid = new AthleteId("some-uid");
    const mockAthleteData = {
      uid: "some-uid",
      name: "john doe",
      age: 30,
      email: "john@vitruve.com",
      password: "password",
      team: "team a",
      toJSON: jest.fn().mockReturnValue({
        uid: "some-uid",
        name: "john doe",
        age: 30,
        email: "john@vitruve.com",
        password: "password",
        team: "team a",
      }),
      update: jest.fn().mockResolvedValue(undefined),
      save: jest.fn().mockResolvedValue(undefined),
    };

    const updateAthleteDto: AthleteUpdateDto = {
      name: "John Updated",
    };

    const findByIdMock = jest
      .spyOn(repository, "findById")
      .mockResolvedValue(mockAthleteData as any);
    const updatedAthlete = await repository.update(uid, updateAthleteDto);

    expect(findByIdMock).toHaveBeenCalledWith("some-uid");
    expect(mockAthleteData.update).toHaveBeenCalledWith({
      name: "john updated",
    });
    expect(mockAthleteData.save).toHaveBeenCalled();
    expect(updatedAthlete.toPrimitives()).toMatchObject({
      uid: "some-uid",
      name: "john doe",
      age: 30,
      email: "john@vitruve.com",
      password: "password",
      team: "team a",
    });
  });

  it("should throw a DomainError if the athlete is not found", async () => {
    const uid = new AthleteId("non-existing-uid");
    const updateAthleteDto: AthleteUpdateDto = {
      name: "John Updated",
    };

    const findByIdMock = jest
      .spyOn(repository, "findById")
      .mockRejectedValue(new DomainError("Athlete not found"));
    await expect(repository.update(uid, updateAthleteDto)).rejects.toThrow(
      DomainError
    );

    expect(findByIdMock).toHaveBeenCalledWith("non-existing-uid");
  });

  it("should handle errors during the update process", async () => {
    const uid = new AthleteId("some-uid");
    const updateAthleteDto: AthleteUpdateDto = {
      name: "John Updated",
    };

    const mockAthleteData = {
      update: jest.fn().mockRejectedValue(new Error("Update failed")),
      save: jest.fn(),
      toJSON: jest.fn().mockReturnValue({}),
    };

    const findByIdMock = jest
      .spyOn(repository, "findById")
      .mockResolvedValue(mockAthleteData as any);

    await expect(repository.update(uid, updateAthleteDto)).rejects.toThrow(
      "Unexpected error occurred while updating Athlete"
    );

    expect(findByIdMock).toHaveBeenCalledWith("some-uid");
    expect(mockAthleteData.update).toHaveBeenCalledWith({
      name: "john updated",
    });
  });
});
