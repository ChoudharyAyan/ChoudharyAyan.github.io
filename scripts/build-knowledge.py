from pathlib import Path
from html.parser import HTMLParser
import json,re
root=Path(__file__).resolve().parents[1]
# Use explicit slices to keep extraction independent of malformed/void markup depths.
entries=[]
for path in ['index.html','builds/job-search-agent.html','builds/product-teardown-agent.html','articles/vision-model-benchmark.html']:
 s=(root/path).read_text()
 patterns=re.findall(r'<article\b([^>]*)>(.*?)</article>',s,re.S) if path=='index.html' else re.findall(r'<(?:section|article)\b([^>]*)>(.*?)</(?:section|article)>',s,re.S)
 for attrs,body in patterns:
  if path=='index.html' and 'timeline-item' not in attrs:continue
  heading=re.search(r'<h[123][^>]*>(.*?)</h[123]>',body,re.S)
  if not heading:continue
  def plain(html):
   class Text(HTMLParser):
    def __init__(self):super().__init__();self.out=[]
    def handle_data(self,d):self.out.append(d)
   t=Text();t.feed(html);return re.sub(r'\s+',' ',' '.join(t.out)).strip()
  title=plain(heading[1]);paras=re.findall(r'<p\b[^>]*>(.*?)</p>',body,re.S)
  text='\n'.join(plain(x) for x in paras)
  if not text:continue
  when=re.search(r'class="timeline-when">(.*?)</div>',body,re.S)
  if when:text=plain(when[1])+'\n'+text
  section=re.search(r'id="([^"]+)"',attrs)
  url=('#journey' if path=='index.html' else path+('#'+section[1] if section else ''))
  entries.append({'title':title,'text':text,'url':url})
caption=re.search(r'<figcaption>(.*?)</figcaption>',(root/'index.html').read_text(),re.S)
if caption:entries.append({'title':'Profile photo','text':'Photo caption: '+plain(caption[1]),'url':'#top'})
# The article summary is a div, so index it explicitly.
s=(root/'articles/vision-model-benchmark.html').read_text();summary=re.search(r'<div><h2>(.*?)</h2><p>(.*?)</p>',s,re.S)
if summary:entries.append({'title':'Vision benchmark summary','text':re.sub('<[^>]+>','',summary[1])+'. '+re.sub('<[^>]+>','',summary[2]),'url':'articles/vision-model-benchmark.html'})
# Individual published model rows let the guide answer exact benchmark questions.
for row in re.findall(r'<tr\b[^>]*>(.*?)</tr>',s,re.S):
 if 'scope="row"' not in row:continue
 cells=re.findall(r'<(?:td|th)\b[^>]*>(.*?)</(?:td|th)>',row,re.S)
 if len(cells)!=8:continue
 name=plain(cells[0].split('<small')[0]); values=[plain(c) for c in cells[1:]]
 text=f"{name} scored {values[0]} FNDS. Item recall: {values[1]}. Naming: {values[2]}. Description: {values[3]}. Search: {values[4]}. Measured cost: {values[5]} per 1,000 images. Median latency: {values[6]}. These are results from the published 100-image benchmark using OpenRouter, not current pricing or a universal ranking."
 entries.append({'title':name+' benchmark results','model':name,'text':text,'url':'articles/vision-model-benchmark.html#results'})
# Curated professional facts verified against the owner’s LinkedIn profile.
entries.extend(json.loads((root/'data/linkedin-knowledge.json').read_text()))
(root/'knowledge.js').write_text('window.PORTFOLIO_KNOWLEDGE = '+json.dumps(entries,ensure_ascii=False,indent=2)+';\n')
print('Indexed',len(entries),'published content sections')
