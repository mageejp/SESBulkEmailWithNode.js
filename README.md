# SESBulkEmailWithNode.js
Node.js script for sending bulk email via SES, with rate-limiting

This script allows you to use AWS Simple Email Service (SES) to send bulk emails from a template. SES requires you to rate-limit how many requests you make, which adds an additional layer of complexity to using their otherwise "simple" and *cheap* service.

Reads destination addresses from a text file (input.txt) with one email address per line. You must upload/define your template in AWS/SES before deploying this script.

## WARNING
This is a very finicky way to send emails. Make absolutely sure that your addresses are correct and your template is ready to go. There is no prompt for confirmation--run the script and away it goes. Remember that AWS can revoke your email privileges if you send bad mail (bounces, spam reports, complaints, etc.) Also note that you MUST COMPLY with your local/national laws around bulk email. In the US, this means at the very least allowing *opt-out* and *including your name and a physical mailing address.*

*Specific localities will have their own laws, and this Readme does not count as legal advice.*
