import { Request, Response } from "express";
import { get } from "lodash";
import log from "../logger";
import Report from "../models/report.model";
import { 
    findAllReports,
    findOneReport,
    findAndUpdate,
    findReports,
    deleteReport,
    createReport,
    aggregateReport
         } from "../service/countryService"

export const getAgregateCountryReportHandler = async (req: Request, res: Response) => {
    try {


        const dateFrom = get(req, "query.dateFrom");
        const country = get(req, "query.c");
        const dateTo = get(req, "query.dateTo");
        const rangeSize = get(req, "query.rangeSize");
        const sortDate = get(req, "query.sort");
    
        const generatedReport = await aggregateReport([
            { $match: { ReportingCountry: country,
                YearWeekISO: {
                    $gte: dateFrom,
                    $lte : dateTo
                } }
            },
            { $group: { 
                _id: "$YearWeekISO",
                NumberDosesReceived: { $sum: "$NumberDosesReceived"}
            }},
            { $sort : { _id : 1 }}
        ])

        let newGeneratedReport = [];

        if(generatedReport.length > 0){
            let startRange = Number(generatedReport[0]._id.slice(-2));
            let weekStart = generatedReport[0]._id;
            let endRange = startRange + Number(rangeSize);
            let reportCount = generatedReport.length;
            let totalNumDoses = 0;    
    
            for (let i = 0; i < reportCount; i++) {            
                const element = generatedReport[i];
                const lastItem = i == reportCount -1 ? true: false;
    
                if(!lastItem){
                    let nextItemRange = Number( generatedReport[i+1]._id.slice(-2));
                    totalNumDoses = totalNumDoses + element.NumberDosesReceived;
    
                    if( nextItemRange >= endRange+1 ){
                        let item = {
                            "weekStart": weekStart,
                            "weekEnd": element._id,
                            "NumberDosesReceived" : totalNumDoses
                        }
                        newGeneratedReport.push(item)
                        weekStart = generatedReport[i+1]._id
                        totalNumDoses = 0
                        endRange = Number(generatedReport[i+1]._id.slice(-2)) + Number(rangeSize);
                    }
                } else {
                    totalNumDoses = totalNumDoses + element.NumberDosesReceived;
                    let item = {
                        "weekStart": weekStart,
                        "weekEnd": element._id,
                        "NumberDosesReceived" : totalNumDoses
                    }
                    newGeneratedReport.push(item)
                }
            }
    
            if(sortDate === 'NumberDosesReceived') newGeneratedReport.sort((a,b) => a.NumberDosesReceived - b.NumberDosesReceived)
            else newGeneratedReport.sort((a,b) => a._id - b._id)
        }
       
        let report = {
            summary : newGeneratedReport
        }
        
        return res.status(200).json({
            status:200,
            report
        })

    } catch (error) {
        log.error(error as string)
        return res.status(500).json({
            message: "Ops something went wrong. Try again latter!!@"
        })
    }
}


//example of how to implement a get handler without aggregation
export const getCountryReportHandler = async (req: Request, res: Response) => {
    try {

        const dateFrom = get(req, "query.dateFrom");
        const country = get(req, "query.c");
        const dateTo = get(req, "query.dateTo");
        const rangeSize = get(req, "query.rangeSize");
        const sortDate = get(req, "query.sort");
          
        const generatedReport = await findReports({
                ReportingCountry: country,
                YearWeekISO: {
                    $gte: dateFrom,
                    $lte : dateTo
                }
            }, { sort: { weekStart : 1 }, limit: rangeSize })

        if(!generatedReport){
            return res.status(404).json({
                status: 404,
                message: "No report found"
            })
        }

        return res.status(200).json({
            status:200,
            report: generatedReport
        })

    } catch (error) {
        log.error(error as string)
        return res.status(500).json({
            message: "Ops something went wrong. Try again latter!!@"
        })
    }
}

//example of create Handler 
export const createReportHandler = async (req: Request, res: Response) => {
    try {
        //Todo: Check if doc exist, if so return eroor message 
        
        //if no doc exist insert into db
        const createNewReport = await createReport(req.body)

        if(!createNewReport){
            return res.status(404).json({
                status: 404,
                message: "No report found"
            })
        }

        return res.status(200).json({
            status:200,
            report: createNewReport
        })

    } catch (error) {
        log.error(error as string)
        return res.status(500).json({
            message: "Ops something went wrong. Try again latter!!@"
        })
    }
}