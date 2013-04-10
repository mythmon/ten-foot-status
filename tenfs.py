import requests
from flask import Flask

app = Flask(__name__)


@app.route('/')
def ping():
    return '10fs'


@app.route('/jenkins/data')
def jenkins_data():
    query = 'jobs[name,color,buildable,lastBuild[timestamp]]'
    url = 'https://ci.mozilla.org/api/json?tree={0}'.format(query)
    resp = requests.get(url)
    return resp.text
