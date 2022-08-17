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
    createReport
         } from "../service/countryService"

export const getAgregateCountryReportHandler = async (req: Request, res: Response) => {
    try {


        const dateFrom = get(req, "query.dateFrom");
        const country = get(req, "query.c");
        const dateTo = get(req, "query.dateTo");
        const rangeSize = get(req, "query.rangeSize");
        const sortDate = get(req, "query.sort");



        const generatedReport = await Report.aggregate([
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
    
        let startRange = Number(generatedReport[0]._id.slice(-2));
        let weekStart = generatedReport[0]._id;
        let endRange = startRange + Number(rangeSize);
        let reportCount = generatedReport.length;
        let totalNumDoses = 0;
        let newGeneratedReport = []


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



export const getCountryReportHandler = async (req: Request, res: Response) => {
    try {

    const dateFrom = get(req, "query.dateFrom");
    const country = get(req, "query.c");
    const dateTo = get(req, "query.dateTo");
    const rangeSize = get(req, "query.rangeSize");
    const sort = get(req, "query.sort");

        // console.log(req.query)
        // log.info(` from ${dateFrom} to ${dateTo} country ${country}
        // rangeSize ${rangeSize} sort ${sort}`)

        res.send(200)
    } catch (error) {
        log.error(error as string)
        return res.status(500).json({
            message: "Ops something went wrong. Try again latter!!@"
        })
    }
}