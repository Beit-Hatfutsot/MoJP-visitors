import re
import sys
import json
import requests


line_re = re.compile(r'([0-9\.]+) \- \- \[(.+)\] (\".+\") (\d{3}) (\d+) \"\-\" \"(.*)\"')

def line2visitor(line):
    l = line_re.findall(line)
    if not l:
        return l
    l = l[0]
    r = {'ip':          l[0],
         'datetime':    l[1],
         'request':     l[2],
         'response':    l[3],
         'size':        l[4],
         'agent':       l[5],
         }
    if r['agent'][:4] in ('Ping', 'Goog'):
        return False
    geo = requests.get("http://localhost:8080/json/"+r['ip']).json()
    r['latitude'] = geo['latitude']
    r['longitude'] = geo['longitude']
    r['city'] = geo['city']
    return r

if __name__ == "__main__":
    r = []
    for l in sys.stdin:
        v = line2visitor(l)
        if v:
            r.append(v)
            if len(r) > 1000:
                break;

    sys.stdout.write(json.dumps(r))

