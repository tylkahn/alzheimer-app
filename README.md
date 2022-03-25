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
- in psql, run `CREATE USER django CREATEDB`
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
- switch from sqlite to postgres
- come up with a standardized file hierarchy
- figure out how to not use put/delete/update
-