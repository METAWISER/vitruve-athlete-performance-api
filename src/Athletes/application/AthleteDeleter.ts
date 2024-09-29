import { AthleteRepository } from "../infrastructure/AthleteRepository";
import { AthleteId } from "../domain/interfaces/AthleteId";
import { PerformanceMetricsRepository } from "../infrastructure/PerformanceMetricsRepository"; // Asumiendo que tienes un repositorio para las métricas

export class AthleteDeleter {
  constructor(
    private athleteRepository: AthleteRepository,
    private performanceMetricsRepository: PerformanceMetricsRepository
  ) {}

  async run(athleteId: string): Promise<void> {
    // Buscar al atleta por ID
    const athlete = await this.athleteRepository.findById(athleteId);

    // Verificar que el atleta exista
    if (!athlete) {
      throw new Error(`Athlete with ID ${athleteId} not found`);
    }

    // Eliminar las métricas de rendimiento asociadas
    await this.performanceMetricsRepository.deleteByAthleteId(athleteId);

    // Eliminar al atleta
    await this.athleteRepository.delete(new AthleteId(athleteId));
  }
}
