# Project Reboot
Description goes here

## Development enviornment setup

### Homebrew

Installation instructions: http://mxcl.github.com/homebrew/

### Git

  > brew install git

### PostgresSQL
  
  > brew install postgresql

After installation, follow the instructions for initializing the db and setting up launchd.

Create the reboot user in postgres
  
  >createuser -s reboot

### RVM

  > brew install rvm

Install Ruby 2.0.0-p0

  > rvm install 2.0.0-p0

Create gemset

  > rvm gemset create reboot