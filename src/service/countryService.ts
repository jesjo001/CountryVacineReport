import Report, { ReportDocument } from "../models/report.model";
import { omit } from "lodash";
import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";

export const createCounsellor = async (
    input: DocumentDefinition<ReportDocument>
  ) => {
    return await Report.create(input);
  };  

export const findReport = async ( 
    query: FilterQuery<ReportDocument>,
    options: QueryOptions = { lean: true } 
) => {
 return Report.findOne(query, {}, options);
}

export const findAllReports = async () => {
    return Report.find({});
}

export const findAndUpdate = (
    query: FilterQuery<ReportDocument>,
    update: UpdateQuery<ReportDocument>,
    options: QueryOptions
  ) => {
    return Report.findOneAndUpdate(query, update, options);
  };
  
  export function deleteCounsellor(query: FilterQuery<ReportDocument>) {
    return Report.deleteOne(query);
  }
  