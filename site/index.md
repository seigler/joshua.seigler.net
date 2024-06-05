---
layout: base
title: joshua.seigler.net
---

## Posts

{% for post in collections.posts %}
- [{{ post.data.title }}]({{ post.url }})
{% endfor %}

## Music

{% for m in music %}
- [{{ m }}](music/{{ m | slug }}.pdf)
{% endfor %}

## Recipes

{% for recipe in collections.recipes %}
- [{{ recipe.data.title }}]({{ recipe.url }})
{% endfor %}
