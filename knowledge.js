window.PORTFOLIO_KNOWLEDGE = [
  {
    "title": "Building a GTM intelligence platform",
    "text": "Current\nAI product at Sprouts.ai\nI’m building a GTM intelligence platform at Sprouts.ai, focused on making go-to-market signals useful for the teams acting on them.",
    "url": "#journey"
  },
  {
    "title": "Making conversational AI useful at scale",
    "text": "2025 to 2026\nProduct builder at Nurix AI\nBuilt voice and chat agent experiences across sports, financial services, education, and content workflows. Helped shape product direction, evaluation, and user experience.",
    "url": "#journey"
  },
  {
    "title": "Learning to see the whole system",
    "text": "2023 to 2025\nStrategy analyst at Accenture\nWorked across mergers and acquisitions, market entry, and growth strategy, turning complex research and data into decisions.",
    "url": "#journey"
  },
  {
    "title": "A wider lens on business and product",
    "text": "2021 to 2023\nMBA at IIM Bangalore\nStudied at IIM Bangalore, spent a semester on exchange in Japan, and explored customer acquisition and growth as a product intern at Myntra.",
    "url": "#journey"
  },
  {
    "title": "Getting ambitious ideas into motion",
    "text": "2020 to 2021\nProgram manager at Ola Electric\nWorked on strategy, operations, and go-to-market for the Futurefactory, collaborating across teams to improve how plans became execution.",
    "url": "#journey"
  },
  {
    "title": "Where the curiosity took shape",
    "text": "2016 to 2020\nBTech at IIT Bombay\nStudied mechanical engineering and helped lead IIT Bombay’s Mars Rover team. It was an early lesson in building with people across disciplines.",
    "url": "#journey"
  },
  {
    "title": "Job Search Agent",
    "text": "A personal agent that finds product and strategy roles, evaluates which ones fit, and sends a small digest of the openings worth a closer look.",
    "url": "builds/job-search-agent.html"
  },
  {
    "title": "Less scrolling, better signal",
    "text": "01 / THE IDEA\nLooking for the right role can mean reading the same boards every day and reopening jobs already seen. I built an agent to handle the repetitive search and surface a smaller, more relevant set of opportunities.",
    "url": "builds/job-search-agent.html"
  },
  {
    "title": "Find, filter, focus",
    "text": "02 / HOW IT WORKS\nThe agent gathers product and strategy postings, removes duplicates, scores new roles against a profile with AI, and sends a digest when a role clears the relevance threshold.\nCollect postings from enabled job sources.\nSkip repeats and prioritize the roles that match.\nGet a short list of opportunities to review.",
    "url": "builds/job-search-agent.html"
  },
  {
    "title": "An agent that earns attention",
    "text": "03 / THE BUILD\nI connected search, deduplication, AI scoring, a local dashboard, and scheduled email alerts into one workflow. It is built to run in the background, then let a person make the final call.",
    "url": "builds/job-search-agent.html"
  },
  {
    "title": "PRODUCT TEARDOWN Agent",
    "text": "A mobile-first workspace for walking through a product, capturing what happens on every screen, and turning those notes into a report worth sharing.",
    "url": "builds/product-teardown-agent.html"
  },
  {
    "title": "FROM SCREENS TO A STORY.",
    "text": "01 / THE IDEA\nA product teardown is easiest to trust when the observations stay connected to the actual journey. This tool keeps screenshots, notes, and timestamps together as I move through an app, then gives that raw record a clear structure.",
    "url": "builds/product-teardown-agent.html"
  },
  {
    "title": "CAPTURE. ORGANIZE. SHARE.",
    "text": "02 / HOW IT WORKS\nThe flow is designed for one-handed use on a phone. I capture a screen, write a quick note, and keep moving. The report groups findings while retaining the original observations, so readers can trace a conclusion back to what was seen.\nSave each screen with a short note and timestamp.\nGroup friction, delight, questions, and observations by stage.\nReview the report online or export it as a PDF.",
    "url": "builds/product-teardown-agent.html"
  },
  {
    "title": "A tool for better product conversations",
    "text": "03 / THE BUILD\nI built the capture flow, report generation, PDF export, and sharing options as one connected workflow. The goal is simple: make it easy to show what happened, what stood out, and why it matters.",
    "url": "builds/product-teardown-agent.html"
  },
  {
    "title": "Can a vision model identify every item in a fashion screenshot ?",
    "text": "A benchmark of item-level extraction: find every purchasable product, name it, describe it, and write the query to find it.\nTHE SHORT ANSWER / 01\nIt scored 94.7 on the FNDS framework, effectively tying the top scorer, at $3.19 per 1,000 images and 4.7 seconds median latency. Those numbers come from this 100-image test set and the OpenRouter API path used for the benchmark.\n01 / METHOD\nThe task was to identify every purchasable item in a fashion screenshot, classify its product type, describe 11 attributes, and generate a search query. Each model received one image in a single call.\n8 categories, 46 celebrity looks, 54 everyday looks\nGoogle, OpenAI, Anthropic, and Alibaba, accessed through OpenRouter\nGemini 3.1 Pro and Claude Sonnet 5.5 labelled each image independently; only agreed items were scored.\nA GPT-5.6 Terra audit of 20 images found 100% of included items valid and 97.8% of their attributes correct. Latency is the median end-to-end time per call across 100 images.\nFour components combine into a 0–100 score. Near misses receive half credit, such as reading trousers as leggings or navy as black.\nFNDS = 0.25F + 0.25N + 0.30D + 0.20S",
    "url": "articles/vision-model-benchmark.html"
  },
  {
    "title": "Flash models Lead the field",
    "text": "02 / RESULTS\nGemini 3.6 Flash posted the highest FNDS score at 95.0. Gemini 3 Flash followed at 94.7, while showing the strongest item recall and naming accuracy in this run. Gaps under five points should be treated as within the noise of this 100-image sample.\nSWIPE TO SEE ALL COLUMNS →\nF = Finds, N = Names, D = Describes, S = Search. All costs and latencies are from the benchmark’s OpenRouter path, rather than a claim about every provider or deployment.",
    "url": "articles/vision-model-benchmark.html#results"
  },
  {
    "title": "More expensive Isn’t always better",
    "text": "03 / COST VS QUALITY\nQuality begins to flatten near $3 per 1,000 images. Gemini 3 Flash sits near the upper-left of the cost-quality map; Gemini 3.5 Flash costs about 3.5 times as much while scoring 3.9 points lower.\nSWIPE TO EXPLORE THE CHART →\n94.7 FNDS at $3.19, with the best item recall and product-type accuracy in this run.\nThe lowest listed API cost at $0.51 per 1,000 images, with a 79.2 FNDS score.\nLower accuracy and much slower through this API route, but relevant when images need to stay in-house.",
    "url": "articles/vision-model-benchmark.html#cost-quality"
  },
  {
    "title": "I’d start with Gemini 3 Flash",
    "text": "04 / THE DECISION\nFor live item extraction at scale, it offers the strongest balance in this test: effectively the top quality score, lower cost than the highest scorer, and a 4.7-second median response. Its 98.8 item recall and 98.4 naming score are especially useful when missing or misnaming a garment breaks the downstream search experience.\nIf API price is the overriding constraint, GPT-5 nano is cheaper. If images must stay in-house, Qwen3-VL is worth considering despite its lower scores and roughly 20-second API latency here.\nScope matters. This is a 100-screenshot, eight-category benchmark with model access through OpenRouter. Prices, latency, and model behavior can change; small score gaps should not be treated as universal rankings. Validate a production choice on your own image mix.",
    "url": "articles/vision-model-benchmark.html#decision"
  },
  {
    "title": "Profile photo",
    "text": "Photo caption: Aomori, Japan",
    "url": "#top"
  },
  {
    "title": "Vision benchmark summary",
    "text": "Gemini 3 Flash hits the sweet spot. It scored 94.7 on the FNDS framework, effectively tying the top scorer, at $3.19 per 1,000 images and 4.7 seconds median latency. Those numbers come from this 100-image test set and the OpenRouter API path used for the benchmark.",
    "url": "articles/vision-model-benchmark.html"
  },
  {
    "title": "Gemini 3.6 Flash benchmark results",
    "model": "Gemini 3.6 Flash",
    "text": "Gemini 3.6 Flash scored 95.0 FNDS. Item recall: 94.8. Naming: 98.2. Description: 94.3. Search: 92.1. Measured cost: $5.01 per 1,000 images. Median latency: 6.8s. These are results from the published 100-image benchmark using OpenRouter, not current pricing or a universal ranking.",
    "url": "articles/vision-model-benchmark.html#results"
  },
  {
    "title": "Gemini 3 Flash benchmark results",
    "model": "Gemini 3 Flash",
    "text": "Gemini 3 Flash scored 94.7 FNDS. Item recall: 98.8. Naming: 98.4. Description: 93.5. Search: 91.3. Measured cost: $3.19 per 1,000 images. Median latency: 4.7s. These are results from the published 100-image benchmark using OpenRouter, not current pricing or a universal ranking.",
    "url": "articles/vision-model-benchmark.html#results"
  },
  {
    "title": "Gemini 3.5 Flash benchmark results",
    "model": "Gemini 3.5 Flash",
    "text": "Gemini 3.5 Flash scored 90.8 FNDS. Item recall: 88.1. Naming: 95.3. Description: 92.8. Search: 86.5. Measured cost: $11.05 per 1,000 images. Median latency: 5.0s. These are results from the published 100-image benchmark using OpenRouter, not current pricing or a universal ranking.",
    "url": "articles/vision-model-benchmark.html#results"
  },
  {
    "title": "Gemini 3.1 Flash-Lite benchmark results",
    "model": "Gemini 3.1 Flash-Lite",
    "text": "Gemini 3.1 Flash-Lite scored 89.3 FNDS. Item recall: 93.1. Naming: 98.1. Description: 91.9. Search: 88.4. Measured cost: $2.18 per 1,000 images. Median latency: 4.5s. These are results from the published 100-image benchmark using OpenRouter, not current pricing or a universal ranking.",
    "url": "articles/vision-model-benchmark.html#results"
  },
  {
    "title": "GPT-5.4 mini benchmark results",
    "model": "GPT-5.4 mini",
    "text": "GPT-5.4 mini scored 88.1 FNDS. Item recall: 93.9. Naming: 95.0. Description: 82.7. Search: 80.2. Measured cost: $4.26 per 1,000 images. Median latency: 5.9s. These are results from the published 100-image benchmark using OpenRouter, not current pricing or a universal ranking.",
    "url": "articles/vision-model-benchmark.html#results"
  },
  {
    "title": "GPT-5.6 Luna benchmark results",
    "model": "GPT-5.6 Luna",
    "text": "GPT-5.6 Luna scored 86.1 FNDS. Item recall: 97.3. Naming: 95.5. Description: 74.8. Search: 77.3. Measured cost: $1.19 per 1,000 images. Median latency: 8.0s. These are results from the published 100-image benchmark using OpenRouter, not current pricing or a universal ranking.",
    "url": "articles/vision-model-benchmark.html#results"
  },
  {
    "title": "Claude Haiku 4.5 benchmark results",
    "model": "Claude Haiku 4.5",
    "text": "Claude Haiku 4.5 scored 84.7 FNDS. Item recall: 90.5. Naming: 94.5. Description: 80.2. Search: 72.2. Measured cost: $5.94 per 1,000 images. Median latency: 5.6s. These are results from the published 100-image benchmark using OpenRouter, not current pricing or a universal ranking.",
    "url": "articles/vision-model-benchmark.html#results"
  },
  {
    "title": "GPT-5.4 nano benchmark results",
    "model": "GPT-5.4 nano",
    "text": "GPT-5.4 nano scored 82.0 FNDS. Item recall: 94.4. Naming: 92.2. Description: 71.4. Search: 73.9. Measured cost: $1.32 per 1,000 images. Median latency: 6.2s. These are results from the published 100-image benchmark using OpenRouter, not current pricing or a universal ranking.",
    "url": "articles/vision-model-benchmark.html#results"
  },
  {
    "title": "GPT-5 nano benchmark results",
    "model": "GPT-5 nano",
    "text": "GPT-5 nano scored 79.2 FNDS. Item recall: 84.3. Naming: 89.5. Description: 73.0. Search: 74.1. Measured cost: $0.51 per 1,000 images. Median latency: 10.7s. These are results from the published 100-image benchmark using OpenRouter, not current pricing or a universal ranking.",
    "url": "articles/vision-model-benchmark.html#results"
  },
  {
    "title": "Qwen3-VL 235B benchmark results",
    "model": "Qwen3-VL 235B",
    "text": "Qwen3-VL 235B scored 72.2 FNDS. Item recall: 71.4. Naming: 76.1. Description: 73.2. Search: 70.8. Measured cost: $1.64 per 1,000 images. Median latency: 22.2s. These are results from the published 100-image benchmark using OpenRouter, not current pricing or a universal ranking.",
    "url": "articles/vision-model-benchmark.html#results"
  },
  {
    "title": "Qwen3-VL 30B benchmark results",
    "model": "Qwen3-VL 30B",
    "text": "Qwen3-VL 30B scored 66.5 FNDS. Item recall: 70.1. Naming: 70.5. Description: 66.0. Search: 61.5. Measured cost: $0.65 per 1,000 images. Median latency: 20.7s. These are results from the published 100-image benchmark using OpenRouter, not current pricing or a universal ranking.",
    "url": "articles/vision-model-benchmark.html#results"
  }
];
