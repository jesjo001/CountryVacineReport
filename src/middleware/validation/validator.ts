import { body, param, query, validationResult } from "express-validator";
import express, { Request, Response, NextFunction } from "express";

export const reportValidationRules = () => {
  return [
    // yearWeekISO must not be empty
    body("yearWeekISO").not().isEmpty(),
    // firstDose is a number
    body("firstDose").isNumeric(),
    // firstDoseRefused is required
    body("FirstDoseRefused").isString(),
    // secondDose is a number
    body("secondDose").isNumeric(),
    //doseAdditional1 is a number
    body("doseAdditional1").isNumeric(),
    //doseAdditional2 is a number
    body("doseAdditional2").isNumeric(),
    //unknownDose is a number
    body("unknownDose").isNumeric(),
    //numberDosesReceived is a number
    body("numberDosesReceived").isNumeric(),
    //numberDosesExported is a number
    body("numberDosesExported").isNumeric(),
    //region is not empty
    body("region").not().isEmpty(),
    //population is a number
    body("population").isNumeric(),
    //reportingCountry is not required
    body("reportingCountry").not().isEmpty(),
    //targetGroup is a number
    body("targetGroup").isNumeric(),
    //vaccine is not empty
    body("vaccine").not().isEmpty(),
    //denominator is a number
    body("denominator").isNumeric(),
  ];
};



export const queryParamsValidationRules = () => {
  return [
    // country is required
    query("c").exists(),
    // dateFrom is required
    query("dateFrom").not().isEmpty(),
    // dateTo is required
    query("dateTo").not().isEmpty(),
    // rangeSize is required
    query("rangeSize").isNumeric(),
    // body is required
    query("sort").not().isEmpty(),
  ];
};


export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: any = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
