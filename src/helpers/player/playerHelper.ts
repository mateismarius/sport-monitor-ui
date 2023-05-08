import { MeasurementTaken } from './../../app/models/measurementTaken';
import { Measurement } from './../../app/models/measurement';
import { Player } from './../../app/models/player'; 
import { number } from 'yup';

export const getAge = (DOB: string) => {
    var dob = DOB.split('.').reverse().join("/");
    var birthDate = new Date(dob);
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

