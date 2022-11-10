import pandas as pd
import mysql.connector
import requests as req
from dotenv import load_dotenv
from datetime import datetime
from datetime import timezone
from typing import Union
import urllib.parse
import os
load_dotenv()

GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')

cnx = mysql.connector.connect(user='root', password='Rvega2015',
                              host='127.0.0.1',
                              database='github')


def execute_query(type: str, query: str = None, values: Union[list, tuple] = None):
    cursor = cnx.cursor()
    if type == 'SELECT':
        query = "SELECT id, full_name FROM repositories"
        cursor.execute(query)
        all = cursor.fetchall()
        cursor.close()
        return all

    elif (type == 'INSERT'):
        try:
            cursor.execute(query, values)
            cnx.commit()
        except mysql.connector.Error as err:
            print(err)
            pass
        cursor.close()


def iso_to_datetime(iso) -> datetime:
    new_dt = datetime.fromisoformat(iso[:-1]).astimezone(timezone.utc)
    return new_dt


def github_api(type: str, repo: str, params: dict) -> dict:
    url_params = urllib.parse.urlencode(params)
    if (type == 'issues'):
        r = req.get(
            f"https://api.github.com/repos/{repo}/issues?{url_params}",
            headers={'Authorization': f'token {GITHUB_TOKEN}'}
        )
        issues = r.json()
        return issues
