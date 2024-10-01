import { MetricsCreator } from "../../../src/Metrics/application/MetricsCreator";
import { MetricsRepository } from "../../../src/Metrics/infrastructure/MetricsRepository";
import { AthleteRepository } from "../../../src/Athletes/infrastructure/AthleteRepository";
import { AthleteId } from "../../../src/Athletes/domain/interfaces/AthleteId";
import { Athlete } from "../../../src/Athletes/domain/Athlete";
import { AthleteName } from "../../../src/Athletes/domain/interfaces/AthleteName";
import { AthleteAge } from "../../../src/Athletes/domain/interfaces/AthleteAge";
import { AthleteEmail } from "../../../src/Athletes/domain/interfaces/AthleteEmail";
import { AthletePassword } from "../../../src/Athletes/domain/interfaces/AthletePassword";
import { AthleteTeam } from "../../../src/Athletes/domain/interfaces/AthleteTeam";
import {
  MetricTypeEnum,
  MetricUnitEnum,
} from "../../../src/api/dtos/MetricsCreator.dto";

describe("MetricsCreator", () => {
  it("should create a metric successfully", async () => {
    const mockMetricsRepository = {
      create: jest.fn(),
    } as unknown as MetricsRepository;

    const mockAthleteRepository = {
      findById: jest.fn().mockResolvedValue(
        new Athlete(
          new AthleteId("some-athlete-id"),
          new AthleteName("John Doe"),
          new AthleteAge(25),
          new AthleteEmail("john.doe@vitruve.com"),
          new AthletePassword("password"),
          new AthleteTeam("Team A")
        )
      ),
    } as unknown as AthleteRepository;

    const metricsCreator = new MetricsCreator(
      mockMetricsRepository,
      mockAthleteRepository
    );

    const metricData = {
      metricType: MetricTypeEnum.SPEED,
      value: 25.5,
      unit: MetricUnitEnum.METERS_PER_SECOND,
    };

    const athleteId = new AthleteId("some-athlete-id");

    await metricsCreator.run(athleteId, metricData);

    expect(mockMetricsRepository.create).toHaveBeenCalledWith(
      expect.anything()
    );
  });
});
