var AWS = require('aws-sdk');
const readline = require('readline');
const fs = require('fs');
AWS.config.update({region: 'us-east-1'});


var RateLimiter = require('limiter').RateLimiter; //Loading limiter to throttle requests - https://stackoverflow.com/questions/20253425/throttle-and-queue-up-api-requests-due-to-per-second-cap/25022653
var limiter = new RateLimiter(1, 1000); // at most 5 requests per second

// Create sendBulkTemplatedEmail params
async function LineToAddress() {
  const fileStream = fs.createReadStream('input.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in text file as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    limiter.removeTokens(1, function() {

      var params = {
          Destinations: [
            {
              Destination: {
                ToAddresses: [line]
              },
              ReplacementTemplateData: '{}'
          },
          ],
          Source: 'YourSESSourceEmailAddress',
          Template: 'TemplateName',
          DefaultTemplateData: '{}'
      };

      console.log(params.Destinations[0]);

      // Create the promise and SES service object
      var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendBulkTemplatedEmail(params).promise();

      // Handle promise's fulfilled/rejected states
      sendPromise.then(
            function(data) {
              console.log(data);
            }).catch(
              function(err) {
              console.log(err, err.stack);
      });

   });
  };
};

LineToAddress();
