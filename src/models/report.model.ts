import mongoose from "mongoose"


export interface ReportDocument extends mongoose.Document {
    yearWeekISO : string,
    firstDose: number,
    firstDoseRefused: string,
    secondDose : number,
    doseAdditional1 : number,
    doseAdditional2 : number,
    unknownDose : number,
    numberDosesReceived : number,
    numberDosesExported : number,
    region : string,
    population : number,
    reportingCountry : string,
    targetGroup : string,
    vaccine : string,
    denominator : number
}

const reportSchema = new mongoose.Schema(
    {
      yearWeekISO: {
            type: String,
            required: true,
          },
          firstDose: {
            type: Number,
            required: true,
          },
          firstDoseRefused: {
            type: String,
            required: true,
          },
          secondDose: {
            type: Number,
            required: true,
          },
          doseAdditional1: {
            type: Number,
            required: true,
          },
          doseAdditional2: {
            type: Number,
            required: true,
          },
          unknownDose: {
            type: Number,
            required: true,
          },
          numberDosesReceived: {
            type: Number,
            required: true,
          },
          numberDosesExported: {
            type: Number,
            required: true,
          },
          region: {
            type: String,
            required: true,
          },
          population: {
            type: Number,
            required: true,
          },
          reportingCountry: {
            type: String,
            required: true,
          },
          targetGroup: {
            type: String,
            required: true,
          },
          vaccine: {
            type: String,
            required: true,
          },
          denominator: {
            type: Number,
            required: true,
          }
    }
)

const Report = mongoose.model<ReportDocument>("Report", reportSchema );
export default Report;