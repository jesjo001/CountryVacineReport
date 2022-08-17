import * as mongoose from "mongoose"


export interface ReportDocument extends mongoose.Document {
    YearWeekISO : string,
    FirstDose: number,
    FirstDoseRefused: string,
    SecondDose : number,
    DoseAdditional1 : number,
    DoseAdditional2 : number,
    UnknownDose : number,
    NumberDosesReceived : number,
    NumberDosesExported : number,
    Region : string,
    Population : string,
    ReportingCountry : string,
    TargetGroup : string,
    Vaccine : string,
    Denominator : number
}

const reportSchema = new mongoose.Schema(
    {
      YearWeekISO: {
            type: String,
            required: true,
          },
          FirstDose: {
            type: Number,
            required: true,
          },
          FirstDoseRefused: {
            type: String,
            required: false,
          },
          SecondDose: {
            type: Number,
            required: true,
          },
          DoseAdditional1: {
            type: Number,
            required: true,
          },
          DoseAdditional2: {
            type: Number,
            required: true,
          },
          UnknownDose: {
            type: Number,
            required: true,
          },
          NumberDosesReceived: {
            type: Number,
            required: true,
          },
          NumberDosesExported: {
            type: Number,
            required: true,
          },
          Region: {
            type: String,
            required: true,
          },
          Population: {
            type: String,
            required: true,
          },
          ReportingCountry: {
            type: String,
            required: true,
          },
          TargetGroup: {
            type: String,
            required: true,
          },
          Vaccine: {
            type: String,
            required: true,
          },
          Denominator: {
            type: Number,
            required: true,
          }
    }
)

const Report = mongoose.model<ReportDocument>("Report", reportSchema );
export default Report;