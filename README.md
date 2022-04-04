# alzheimer-app


# dev notes

## prerequisites
(anything later than these versions should be fine)
- python 3.9.7
- node 17.0.1
- pip 21.3.1
- pipenv 2021.5.29
- postgres 14
- **if someone is using an older version of any of the above requirements and the app works fine, then please update the version numbers!**

-----------------

## initial setup

### database
- install postgres v14 (see [postgres documentation](https://www.postgresql.org/docs/14/install-binaries.html) for more details)
- be sure to install command line tools if using a GUI installer
- superuser name/password can be whatever, just make sure you remember it
- test that your postgres installation is working by running `psql --version` and then `psql postgres`
- in psql, run
  - `CREATE USER django CREATEDB;`
  - `CREATE DATABASE django;`
  - `CREATE DATABASE alzheimers_assistance_app OWNER django;`
### backend
- `cd backend`
- `pipenv shell`
- `pipenv install`
- `python manage.py migrate`

### frontend
- `cd frontend`
- `npm install`

-----------------

## start backend
- backend must be started before frontend, or the frontend will complain
- depending on how your env is set up, you may have a different alias for python 3
- `cd backend`
- `pipenv shell`
  - always run `pipenv shell` before doing any backend stuff
- `python manage.py runserver`

## start frontend
- `cd frontend`
- `npm start`



# TODO list
- come up with a standardized file hierarchy
- figure out how to not use put/delete/update
- Clean up code: remove unnecessary files and lines, add documentation
- Immplement Reminder function/update Reminder display to include datetime


# Troubleshooting
- `django.db.utils.ProgrammingError: table "foo" does not exist`
  - for me, this was caused by Django's internal representation of the database going out of sync with the actual database as it exists on my local system
  - first off, if you've made any changes to the models and you're sure they're correct, save them by running:
  - `python manage.py makemigrations`
  - now you can try to fix the problem by running the following:
  - `python manage.py migrate <app> zero` where app is the Django application name
    - if you don't know it, run `manage.py migrate` and look for the migration file that is throwing the error (files are of the form `app.####_desc`)
  - `python manage.py migrate`
  - if it still fails, run with `--fake`
    - `python manage.py migrate <app> zero --fake`
    - `python manage.py migrate`
  - you may have to restart the backend to see the changes in the Django GUI