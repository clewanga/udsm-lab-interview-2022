export function getProcessedData(
  yearOneData: any,
  yearTwoData: any,
  yearThreeData: any
) {
  // TODO:
  // 1. Remove data items that has reporting rate less than 50

  let yearOneDataAbove: any = checkReportingRate(yearOneData);
  let yearTwoDataAbove: any = checkReportingRate(yearTwoData);
  let yearThreeDataAbove: any = checkReportingRate(yearThreeData);

  // 2. Combine relevant data (data of the same code) from each year inorder to compute average
  let [member_registered, active_members] = groupYearCodes(yearOneDataAbove, yearTwoDataAbove, yearThreeDataAbove)

  // 3. Compute average for the combined data to arrive to single value (average value)
  let avg_member_registered: number = findAverage(member_registered);
  let avg_active_members: number = findAverage(active_members);

  // 4. Return the averaged data as final output
  /***
   * [
      {
        value: 43,
        name: 'Number of members registered',
        code: 'MEMBER_REGISTERED',
      },
      {
        value: 17,
        name: 'Number of active members',
        code: 'ACTIVE_MEMBERS',
      },
    ]
   */

    let averageData = [
      {
        value: avg_member_registered,
        name: 'Number of members registered',
        code: "MEMBER_REGISTERED"
      },
      {
        value: avg_active_members,
        name: "Number of active members",
        code: 'ACTIVE_MEMBERS'
      }
    ]

  return averageData;
}

function checkReportingRate(yearReports: any) {
  let temp_yearReports = []
  for (let yearReport of yearReports){
    if (yearReport.reportingRate >= 50 ) {
      temp_yearReports.push(yearReport)
    }
  }

  return temp_yearReports
}

function groupYearCodes(yearOneData: any, yearTwoData: any, yearThreeData: any) {
  let member_registered = [];
  let active_members = [];

  // save year data into 
  for (let yearData of yearOneData){
    if (yearData.code === "MEMBER_REGISTERED") member_registered.push(yearData)

    if ( yearData.code === "ACTIVE_MEMBERS") active_members.push(yearData)
  }

for (let yearData of yearTwoData){
    if (yearData.code === "MEMBER_REGISTERED") member_registered.push(yearData)
    if ( yearData.code === "ACTIVE_MEMBERS") active_members.push(yearData)
  }

  for (let yearData of yearThreeData){
    if (yearData.code === "MEMBER_REGISTERED") member_registered.push(yearData)
    if ( yearData.code === "ACTIVE_MEMBERS") active_members.push(yearData)
  }

  return [member_registered, active_members];
}

// function to find average
function findAverage(reportsData:any) {
  let reportValues = [];

  // get all the values from the obj and store in an array
  for (let reportData of reportsData)    reportValues.push(reportData.value);

  // find the sum of all report values
  let sum = 0
  for (let reportValue of reportValues){
    sum = sum + reportValue;
  }

  // find the average for all values 
  let avg: number = (sum > 0) ? sum/reportValues.length : 0;

  return avg;

}