
import { HoroscopeReports } from "../../domain";

export interface ReportsState {
    isLoading: boolean
    period?: string
    data?: HoroscopeReports
    error?: Error
}
