cube(`Dataset`, {
  sql: `SELECT * FROM public.dataset`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [campaignname, transactionid, creativeid, city, locationname, conversiondate, impressiondate]
    }
  },
  
  dimensions: {
    campaignname: {
      sql: `${CUBE}."campaignName"`,
      type: `string`
    },
    
    transactionid: {
      sql: `${CUBE}."transactionId"`,
      type: `string`
    },
    
    creativeid: {
      sql: `${CUBE}."creativeId"`,
      type: `string`
    },
    
    address: {
      sql: `address`,
      type: `string`
    },
    
    city: {
      sql: `city`,
      type: `string`
    },
    
    locationname: {
      sql: `${CUBE}."locationName"`,
      type: `string`
    },
    
    createtime: {
      sql: `${CUBE}."createTime"`,
      type: `time`
    },
    
    conversiondate: {
      sql: `${CUBE}."conversionDate"`,
      type: `time`
    },
    
    impressiondate: {
      sql: `${CUBE}."impressionDate"`,
      type: `time`
    }
  }
});
