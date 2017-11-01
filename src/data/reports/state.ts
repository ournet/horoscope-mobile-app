
import { HoroscopeReports } from "../../domain";

export interface ReportsState {
    isLoading: boolean
    date?: number
    data?: HoroscopeReports
    error?: Error
}
