import { Request, Response } from "express";
import { get } from "lodash";
import log from "../logger";

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