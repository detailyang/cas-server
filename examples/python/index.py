# @Author: BingWu Yang <detailyang>
# @Date:   2016-03-15T14:47:50+08:00
# @Email:  detailyang@gmail.com
# @Last modified by:   detailyang
# @Last modified time: 2016-03-15T15:37:13+08:00
# @License: The MIT License (MIT)


from flask import Flask
from flask import request, redirect
import requests


app = Flask(__name__)

cas = {
  'name': 'demo',
  'secret': '977beed4-ab6f-4e1f-b60c-9d84c60e1d5a',
  'identify': '24a03e6e-d1ad-4f11-bd02-566b06b39481',
};

@app.route('/')
def hello_world():
    return redirect('https://cas.qima-inc.com/public/oauth/authorize?name={name}'.format(name=cas['name']));

@app.route('/cas/oauth/callback')
def callback():
    code = request.args.get('code', '')
    headers = {'authorization': 'oauth {secret}'.format(secret = cas['secret'])}
    r = requests.get('https://cas.qima-inc.com/oauth/users/self?code={code}'.format(code=code),
        headers=headers, verify=False)
    res = r.json()
    if (res['code'] != 0):
        return res['data']['value'];
    return 'hello, big brother: {username}'.format(username=res['data']['value']['username']);

if __name__ == '__main__':
    app.run(port=3000, debug=True)
