# Explains the style recalcs in a --selectors trace (tmp/trace-selectors.json): every UpdateLayoutTree/Layout
# over the element threshold (argv[1], default 300) with the JS frame that forced it, or Chrome's invalidation
# reasons when no script did; font arrivals and stylesheet parses are listed first for lining up.
# Usage: python .claude/skills/nds-perf/trace-recalcs.py [minElements]
import json, sys
t=json.load(open('tmp/trace-selectors.json',encoding='utf-8'))
ev=t['traceEvents'] if isinstance(t,dict) else t
sheets=[e for e in ev if e.get('name')=='ParseAuthorStyleSheet']
req={e['args']['data']['requestId']:e['args']['data'].get('url','') for e in ev if e.get('name')=='ResourceSendRequest'}
fonts=[(e['ts'],req.get(e['args']['data'].get('requestId'),'')) for e in ev if e.get('name')=='ResourceFinish' and req.get(e['args']['data'].get('requestId'),'').endswith('.woff2')]
inv=sorted([e for e in ev if e.get('name') in ('StyleRecalcInvalidationTracking','StyleInvalidatorInvalidationTracking','ScheduleStyleInvalidationTracking')],key=lambda e:e['ts'])
ev=[e for e in ev if e.get('ph') in ('X','B','E') and e.get('name') in ('UpdateLayoutTree','Layout')]
t0=min(e['ts'] for e in ev)
rows=[];stack={}
for e in sorted(ev,key=lambda e:e['ts']):
    if e['ph']=='X': rows.append((e['ts'],e.get('dur',0),e['name'],e.get('args',{})))
    elif e['ph']=='B': stack.setdefault((e['name'],e.get('tid')),[]).append(e)
    else:
        s=stack.get((e['name'],e.get('tid')))
        if s:
            b=s.pop(); a=dict(b.get('args',{})); a.update(e.get('args',{})); rows.append((b['ts'],e['ts']-b['ts'],e['name'],a))
def frames(a, n=3):
    st=(a.get('beginData') or {}).get('stackTrace') or []
    return ' < '.join(f"{f.get('functionName') or '(anon)'}@{f.get('url','').split('/')[-1]}:{f.get('lineNumber')}:{f.get('columnNumber')}" for f in st[:n]) or '-'
minN=int(sys.argv[1]) if len(sys.argv)>1 else 300
for ts,u in sorted(fonts): print(f"  +{(ts-t0)/1000:8.0f}ms font  {u.split('/')[-1]}")
for e in sorted(sheets,key=lambda e:e['ts']): print(f"  +{(e['ts']-t0)/1000:8.0f}ms sheet {e.get('args',{}).get('data',{}).get('styleSheetUrl','').split('/')[-1][:60]}")
print(f"UpdateLayoutTree {sum(1 for r in rows if r[2]=='UpdateLayoutTree')} · Layout {sum(1 for r in rows if r[2]=='Layout')} · with stack {sum(1 for r in rows if (r[3].get('beginData') or {}).get('stackTrace'))}")
for ts,dur,name,a in rows:
    bd=a.get('beginData') or {}
    if name=='UpdateLayoutTree' and a.get('elementCount',0)<minN and dur<8000: continue
    if name=='Layout' and dur<8000: continue
    n=a.get('elementCount') if name=='UpdateLayoutTree' else f"{bd.get('dirtyObjects')}/{bd.get('totalObjects')}"
    print(f"  +{(ts-t0)/1000:8.0f}ms {name:16} {dur/1000:7.1f}ms  n={n}  {frames(a)}")
    if name=='UpdateLayoutTree' and a.get('elementCount',0)>=800:
        from collections import Counter
        c=Counter()
        for e in inv:
            if e['ts']>ts: break
            if e['ts']<ts-3_000_000: continue
            d=e.get('args',{}).get('data',{}); c[(e['name'].replace('InvalidationTracking',''),d.get('reason',''),str(d.get('extraData',''))[:50],d.get('nodeName','')[:30])]+=1
        for k,v in c.most_common(4): print(f"           {v:5}x {k}")
