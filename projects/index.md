---
layout: page
description: "my work"
title: "Projects"
active: projects
header-img: "img/lost.png"
permalink: /projects/
---

{% for project in site.projects reversed %}
  <h2>
    <a href="{{ project.url }}">
      {{ project.title }}
      </a>
  </h2>
  <p>{{ project.description }}</p>
{% endfor %}
