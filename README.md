# alzheimer-app


# dev notes
note: all `cd` commands are assumed to be executed from the project root (`alzheimer-app`)

## prerequisites
(anything later than these versions _should_ be fine)
- python 3.9.7
- node 17.0.1
- pip 21.3.1
- pipenv 2021.5.29
- postgres 14
- **If someone is using an older version of any of the above requirements and the app works fine, then please update the version numbers!**

-----------------

## initial setup

### database
- Install postgres v14 (see [postgres documentation](https://www.postgresql.org/docs/14/install-binaries.html) for more details)
- Be sure to install command line tools if using a GUI installer
- Superuser name/password can be whatever, just make sure you remember it
- Test that your postgres installation is working by running `psql --version` and then `psql postgres`
- In psql, run
  - `CREATE USER django CREATEDB;`
  - `CREATE DATABASE django;`
  - `CREATE DATABASE alzheimers_assistance_app OWNER django;`
- You can leave the terminal with psql open if you like, but you should never have to directly access it again
### backend
- Install python 3.9.7 (or higher) and `pipenv`
  - I installed globally, but installing in a project directory shouldn't make a difference (except for the commands you'll have to run)
- See [pipenv documentation](https://pypi.org/project/pipenv/) for more details
  - Run `python --version` to verify version number
  - Do the same with `pipenv --version`
- `cd backend`
- `pipenv shell`
- `pipenv install`
- `python manage.py migrate`

### frontend
- `cd frontend`
- `npm install`

-----------------

## start backend
- The backend must be started before the frontend, or the frontend will complain
- Depending on how your machine is set up, you may have a different alias for python 3
- `cd backend`
- `pipenv shell`
  - Always run `pipenv shell` before doing any backend stuff
- `python manage.py runserver`

## start frontend
- `cd frontend`
- `npm start`
  - If the linter is complaining too much, you can try `npm run lint:fix` and `npm run prettify:fix`
  - For when you get really annoyed, there's the not recommended `npm run start:nolinter`
    - It's really nice during development, but don't blame me when you get a wall of linter errors when trying to commit



# TODO list
- Clean up code: remove unnecessary files and lines, add documentation


# Troubleshooting
- `django.db.utils.ProgrammingError: table "foo" does not exist`
  - For me, this was caused by Django's internal representation of the database going out of sync with the actual database as it exists on my local system
  - First off, if you've made any changes to the models and you're sure they're correct, save them by running:
  - `python manage.py makemigrations`
  - Now you can try to fix the problem by running the following:
  - `python manage.py migrate <app> zero` where app is the Django application name
    - If you don't know it, run `manage.py migrate` and look for the migration file that is throwing the error (files are of the form `app.####_desc`)
  - `python manage.py migrate`
  - If it still fails, run with `--fake`
    - `python manage.py migrate <app> zero --fake`
    - `python manage.py migrate`
  - You may have to restart the backend to see the changes in the Django GUI

--

- I don't remember the exact error message, but Django may complain about the Django Postgres user (`django` if you followed the readme) not having a password. If this happens, here's what you can do
  - `psql postgres` (replace postgres with whatever your superuser is)
  - `ALTER ROLE django WITH PASSWORD 'foo'` (replace `foo` with a memorable password)
  - Then go into `backend/backend/settings.py`, find the password section in `DATABASES`, and replace the string with the new password you created for the django user
  - There is a way to store your password locally and have psql autofill it every time you login, but I don't remember how to do it (you'll make InfoSec people happy if you do this though)