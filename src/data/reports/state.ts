
import { HoroscopeReports } from "../../domain";

export interface ReportsState {
    isLoading: boolean
    date: Date
    data?: HoroscopeReports
    error?: Error
}
