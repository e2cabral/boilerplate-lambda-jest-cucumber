import * as assert from 'assert';
import {Given, Then, When} from "@cucumber/cucumber";
import {CarsService} from "../../src/domain/services/cars.service";

const service = new CarsService();

let data: unknown;

let modelExpected: string | null = 'a4';
let makeExpected: string = 'audi';

Given(/^Two parameters a car model and make$/, () => {
    assert.equal('a4', modelExpected);
    assert.equal('audi', makeExpected);
});

When(/^The validation and formatting of the parameters$/, async () => {
    data = await service.getCars(makeExpected, modelExpected);
});

Then(/^Should return an empty list or a list of cars following the parameters$/, () => {
    assert.equal(Array.isArray(data), true);
})