import axios from "axios";
const fhirKitClient = require('fhir-kit-client');
const config = { baseUrl: 'https://r3.smarthealthit.org/' };
const client = new fhirKitClient(config);


export async function handler (req) {
  console.log('req',req)
  let patients = []
  const res =  await client.search({
    resourceType: 'Patient',
    searchParams: { name: req.queryStringParameters.name }
  }).then((response) => {
    patients = response.entry ? response.entry.map((obj) => {
      return {
        id: obj.resource.id,
        name: `${obj.resource.name[0].given} ${obj.resource.name[0].family}`,
        gender: obj.resource.gender,
        birthDate: obj.resource.birthDate
      }
    }) : [];
  }
  
  );
  return {statusCode:200,
  body: JSON.stringify(patients)}
}