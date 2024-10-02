import { AthleteGetService } from "../../../../src/Athletes/application/AthleteGetter";
import { AthleteRepository } from "../../../../src/Athletes/infrastructure/AthleteRepository";
import { AthleteMetricsGetter } from "../../../../src/Metrics/application/MetricsGetter";
import { AthleteId } from "../../../../src/Athletes/domain/interfaces/AthleteId";
import { Athlete } from "../../../../src/Athletes/domain/Athlete";
import { Metrics } from "../../../../src/Metrics/domain/Metrics";

jest.mock("../../../../src/Athletes/infrastructure/AthleteRepository");
jest.mock("../../../../src/Metrics/application/MetricsGetter");

describe("AthleteGetService", () => {
  let athleteRepository: jest.Mocked<AthleteRepository>;
  let athleteMetricsGetter: jest.Mocked<AthleteMetricsGetter>;
  let athleteGetService: AthleteGetService;

  beforeEach(() => {
    athleteRepository = new AthleteRepository({} as any) as jest.Mocked<AthleteRepository>;
    athleteMetricsGetter = new AthleteMetricsGetter({} as any) as jest.Mocked<AthleteMetricsGetter>;
    athleteGetService = new AthleteGetService(athleteRepository, athleteMetricsGetter);
  });

  it("should return athlete data and metrics without password", async () => {
    const athleteId = new AthleteId("some-athlete-id");

    const mockAthlete = {
      uid: "some-athlete-id",
      name: "John Doe",
      age: 30,
      email: "john@vitruve.com",
      team: "Team A",
      toPrimitives: jest.fn().mockReturnValue({
        uid: "some-athlete-id",
        name: "John Doe",
        age: 30,
        email: "john@vitruve.com",
        team: "Team A",
        password: "hashed-password",
      }),
    } as unknown as Athlete;

    const mockMetrics = [
      new Metrics(
        { value: "metric-1" } as any,
        { value: "some-athlete-id" } as any,
        { value: "speed" } as any,
        50.5,
        { value: "kg" } as any,
        new Date(),  // startDate
        undefined,   // endDate
        new Date(),  // createdAt
        undefined    // updatedAt
      ),
    ];

    athleteRepository.findById.mockResolvedValue(mockAthlete);
    athleteMetricsGetter.run.mockResolvedValue(mockMetrics);

    const result = await athleteGetService.run(athleteId);

    expect(athleteRepository.findById).toHaveBeenCalledWith("some-athlete-id");
    expect(athleteMetricsGetter.run).toHaveBeenCalledWith(athleteId);
    expect(result).toEqual({
      athlete: {
        uid: "some-athlete-id",
        name: "John Doe",
        age: 30,
        email: "john@vitruve.com",
        team: "Team A",
      },
      metrics: [
        {
          id: "metric-1",
          athleteId: "some-athlete-id",
          metricType: "speed",
          value: 50.5,
          unit: "kg",
          startDate: expect.any(Date),
          endDate: undefined, 
          createdAt: expect.any(Date),
          updatedAt: undefined,
        },
      ],
    });
    expect(result.athlete).not.toHaveProperty("password");
  });

  it("should throw an error if athlete is not found", async () => {
    const athleteId = new AthleteId("non-existing-athlete-id");

    athleteRepository.findById.mockRejectedValue(new Error("Athlete not found"));

    await expect(athleteGetService.run(athleteId)).rejects.toThrow("Athlete not found");
    expect(athleteRepository.findById).toHaveBeenCalledWith("non-existing-athlete-id");
  });

  it("should return an empty metrics array if no metrics are found", async () => {
    const athleteId = new AthleteId("some-athlete-id");

    const mockAthlete = {
      uid: "some-athlete-id",
      name: "John Doe",
      age: 30,
      email: "john@vitruve.com",
      team: "Team A",
      toPrimitives: jest.fn().mockReturnValue({
        uid: "some-athlete-id",
        name: "John Doe",
        age: 30,
        email: "john@vitruve.com",
        team: "Team A",
        password: "hashed-password",
      }),
    } as unknown as Athlete;

    athleteRepository.findById.mockResolvedValue(mockAthlete);
    athleteMetricsGetter.run.mockResolvedValue([]);

    const result = await athleteGetService.run(athleteId);

    expect(result).toEqual({
      athlete: {
        uid: "some-athlete-id",
        name: "John Doe",
        age: 30,
        email: "john@vitruve.com",
        team: "Team A",
      },
      metrics: [],
    });
  });
});
