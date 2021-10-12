  # Remindr App

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## Description
  This application allows you to Create an account, then allows your to create and manager Remindrs to send you emailed notifications for specific events you would like to be reminded about.

  ## Table of Contents 
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [License](#license)
  - [Features](#features)
  - [How to Contribute](#how-to-contribute)
  - [Tests](#tests)
  - [Questions](#questions)

  ## Installation
  1. Install Node.js https://nodejs.org/dist/v16.8.0/node-v16.8.0-x64.msi 
  2. Clone the data from this git repository 
  3. Install NPM https://docs.npmjs.com/cli/v6/configuring-npm/install 
  5. Install and Configure MySQL https://dev.mysql.com/downloads/installer/
  6. Rename .env.EXAMPLE to .env and configure with your DB Credentials
  7. Navigate to the git repo using your preferred CommandLine Application (Recommended GitBash or Inline Terminal within VSCode)
  8. cd db/ and run 'mysql -u root -p' and enter DataBase Password
  9. run 'source schema.sql' then exit that CLI
  10. run 'npm run seed'
  10. run 'npm i'
  11 run 'npm start'

  ### For testing scheduled task execution complete the following steps
  1. Edit server.js
  2. Uncomment line 8 (sendRemindr require)
  3. Uncomment lines 44 - 47 (cron.schedule)
  4. Edit ./tasks/sendRemindrs.js
  5. Uncomment module.export line

  ### For times in dashboard to show correctly for local instance
  #### These lines convert current machine time from UTC to local depending to machines current time.
  1. Edit ./utils/convertTime.js
  2. Uncomment lines 48 and 57
  3. Comment lines 47 and 56
  
  ## Usage
  This application is intended to be used to schedule and manage Remindrs from their own personal account.

  ### YouTube Run Instructions
  [![YouTube How to Video](https://img.youtube.com/vi/aAicXZbc--A/0.jpg)](https://youtu.be/aAicXZbc--A)
            
  ## Credits
  No Credits Applicable

  ## License
  ### MIT License

  Copyright (c) 2021 Nathaniel Ehrlich, Tommy Jobin, and Alejandra Feuereisen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
      
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  ## How to Contribute
  
As contributors and maintainers of the Professional README Generator, we pledge to respect everyone who contributes by posting issues, updating documentation, submitting pull requests, providing feedback in comments, and any other activities.

Communication through any of my channels (GitHub, mailing lists, Twitter, etc.) must be constructive and never resort to personal attacks, trolling, public or private harassment, insults, or other unprofessional conduct.
      
We promise to extend courtesy and respect to everyone involved in this project regardless of gender, gender identity, sexual orientation, disability, age, race, ethnicity, religion, or level of experience. We expect anyone contributing to the Professional README Generator to do the same.
      
If any member of the community violates this code of conduct, the maintainers of the Professional README Generator may take action, removing issues, comments, and PRs or blocking accounts as deemed appropriate.
      
If you are subject to or witness unacceptable behavior, or have any other concerns, please email us at [remindr.notification@gmail.com](mailto:remindr.notification@gmail.com?subject=[Contribution]).

  ## Tests
  For testing please follow the install instructions and test using all Licenses.

  ## Questions
  If you have any additional questions or would like to reach out for more information, please email me via [remindr.notification@gmail.com](mailto:remindr.notification@gmail.com?subject=[GitHub]).