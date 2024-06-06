---
layout: "base.njk"
pagination:
  data: collections
  size: 1
  alias: tag
  filter:
    - all
permalink: /{{ tag | slugify }}/
---
{% for item in collections[ tag ] | reverse %}
  - [{{ item.data.title }}]({{ item.url }}){% if item.data.dateString %}<aside>{{item.data.dateString}}</aside>{% endif %}
{% endfor %}
