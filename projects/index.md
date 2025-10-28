---
layout: default
title: "Projects"
active: projects
permalink: /projects/
---

{% for project in site.projects reversed %}
  <article style="margin-bottom:16px;">
    <h2 style="margin:0 0 4px;">
      <a href="{{ project.url }}" style="text-decoration:none;">{{ project.title }}</a>
    </h2>
    <p style="margin:0; color:#555;">{{ project.description }}</p>
  </article>
{% endfor %}
